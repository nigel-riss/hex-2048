import {postData} from './api.js';


const Direction = {
  'Q': {x: -1, y: 1,  z: 0},
  'W': {x: 0,  y: 1,  z: -1},
  'E': {x: 1,  y: 0,  z: -1},
  'A': {x: -1, y: 0,  z: 1},
  'S': {x: 0,  y: -1, z: 1},
  'D': {x: 1,  y: -1, z: 0},
};

const GameStatus = {
  PLAYING: `playing`,
  GAME_OVER: `game-over`,
  NETWORK_ERROR: `network-error`,
};

const calcCoord = (offset, shift, distance) => {
  switch(offset) {
    case 0:
      return distance;
    case 1:
      return shift;
    case -1:
      return -distance-shift;
  }
}


const wait = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));

class GameEngine {
  constructor() {
    this._cells = null;
    this._size = null;
    this._viewUpdater = null;
    this._serverURL = null;
  }
  
  init(size, viewUpdater, serverURL) {
    this._canInput = false;
    this._size = size;
    this._viewUpdater = viewUpdater;
    this._serverURL = serverURL;
    console.log(`Initializing game`, size, serverURL);

    window.removeEventListener(`keyup`, this._keyboardInputHandler);
    window.addEventListener(`keyup`, this._keyboardInputHandler);

    this._initCells();
    this._gameStatus = GameStatus.PLAYING;
    this._viewUpdater(this._cells.slice());

    this._fetchServerData()
      .then(this._appendServerData)
      .then(() => {
        this._canInput = true;
      })
      .catch((err) => {
        console.log(err);
        this._gameStatus = GameStatus.NETWORK_ERROR;
        this._viewUpdater(this._cells.slice());
      });
  }

  _initCells() {
    this._cells = [];

    const radius = this._size - 1;

    for (let x = -radius; x <= radius; x++) {
      for (let y = -radius; y <= radius; y++) {
        for (let z = -radius; z <= radius; z++) {  // TODO: Can be optimized here
          if ((x + y + z) === 0) {
            const rndValue = 1 << Math.floor(Math.random() * 4);
            this._cells.push({
              x,
              y,
              z,
              value: 0,
              isLocked: false,
            });
          }
        }
      }
    }
  }

  _keyboardInputHandler = (e) => {
    const normalKey = e.key.toUpperCase();
    const validKeys = Object.keys(Direction);
    const isValidKey = validKeys.includes(normalKey);
    if (isValidKey) {
      this.turn(normalKey);
    }
  }

  _findCell({x, y, z}) {
    return this._cells
      .find(cell => cell.x === x && cell.y === y && cell.z === z);
  }

  _fetchServerData() {
    return postData(this._serverURL, this._size, this.getNonEmptyCells());
  }

  _appendServerData = (response) => {
    console.log(response);
    response.forEach(cell => {
      const currCell = this._findCell(cell);
      if (currCell.value === 0) {
        currCell.value = cell.value;
      }
    });
    this._viewUpdater(this._cells.slice());
  }

  turn(direction) {
    // 1. Wait input
    if (!this._canInput) {return}

    const dirCoords = (Direction[direction]);
    let isValidMove = false;

    // 2. Shift cells
    for (let i = 0; i < this._size * 2; i++) {
      for (let q = this._size - 1; q > -this._size; q--) {
        for (let r = this._size - 1; r > - this._size; r--) {
          const coords = {
            x: calcCoord(dirCoords.x, r, q),
            y: calcCoord(dirCoords.y, r, q),
            z: calcCoord(dirCoords.z, r, q),
          };
          const currentCell = this._findCell(coords);
          if (!currentCell) { continue }

          const neightbourCoords = {
            x: currentCell.x - dirCoords.x,
            y: currentCell.y - dirCoords.y,
            z: currentCell.z - dirCoords.z,
          }
          const neightbourCell = this._findCell(neightbourCoords);
          if (!neightbourCell) { continue }

          if (currentCell.value === neightbourCell.value && currentCell.value !== 0) {
            if (!currentCell.isLocked && !neightbourCell.isLocked) {
              console.log(currentCell, neightbourCell);
              currentCell.value += neightbourCell.value;
              currentCell.isLocked = true;
              neightbourCell.value = 0;
              isValidMove = true;
            }
          }

          if (currentCell.value === 0 && neightbourCell.value !== 0) {
            console.log(currentCell, neightbourCell);
            currentCell.value = neightbourCell.value;
            currentCell.isLocked = neightbourCell.isLocked;
            neightbourCell.isLocked = false;
            neightbourCell.value = 0;
            isValidMove = true;
          }
        }
      }
    this._canInput = true;
    }

    const isCanPlay = this._checkIfCanPlay();
    this._gameStatus = isCanPlay ? GameStatus.PLAYING : GameStatus.GAME_OVER;

    if (isValidMove && isCanPlay) {
      this._viewUpdater(this._cells.slice());
      this._gameStatus = GameStatus.PLAYING;

      // 3. Request data
      this._fetchServerData()
        .then(this._appendServerData)
        .then(() => {
          // 4. Update field
          this._viewUpdater(this._cells.slice());
    
          // 5. Unlock cells
          this._unlockCells();
          this._canInput = true;
        })
        .catch((err) => {
          console.log(err);
          this._gameStatus = GameStatus.NETWORK_ERROR;
          this._viewUpdater(this._cells.slice());
        });
    }

    this._viewUpdater(this._cells);
  }


  _unlockCells() {
    this._cells.forEach(cell => cell.isLocked = false);
  }


  _checkIfCanPlay() {
    return this._cells
      .reduce((acc, cell) => {
        return acc || this._checkAvailNeighbours(cell);
      }, false);
  }

  _checkAvailNeighbours(cell) {
    const directions = Object.values(Direction);
    return directions.reduce((acc, dir) => {
      const neighbourCell = this._findCell({
        x: cell.x + dir.x,
        y: cell.y + dir.y,
        z: cell.z + dir.z,
      });

      if (neighbourCell) {
        return acc
          || (neighbourCell.value === 0)
          || (neighbourCell.value === cell.value);
      }

      return acc;
    }, false);
  }


  getCells() {
    return this._cells;
  }

  getNonEmptyCells() {
    return this._cells.filter(cell => cell.value && cell.value > 0);
  }

  getStatus() {
    return this._gameStatus;
  }
}


export default GameEngine;
