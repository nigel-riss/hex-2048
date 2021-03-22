import {postData} from './api.js';


const Direction = {
  'Q': {x: -1, y: 1,  z: 0},
  'W': {x: 0,  y: 1,  z: -1},
  'E': {x: 1,  y: 0,  z: -1},
  'A': {x: -1, y: 0,  z: 1},
  'S': {x: 0,  y: -1, z: 1},
  'D': {x: 1,  y: -1, z: 0},
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

class GameEngine {
  constructor() {
    this._cells = null;
    this._size = null;
    this._viewUpdater = null;
    this._serverURL = null;
    this._canInput = false;
  }

  init(size, viewUpdater, serverURL) {
    this._size = size;
    this._viewUpdater = viewUpdater;
    this._serverURL = serverURL;

    window.removeEventListener(`keyup`, this._keyboardInputHandler);

    this._initCells();

    window.addEventListener(`keyup`, this._keyboardInputHandler);
    console.log(`Initializing game`, size, serverURL);

    this._fetchServerData()
      .then(this._appendServerData);
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
    this._canInput = true;
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
    }

    if (isValidMove) {
      this._viewUpdater(this._cells.slice());

      // // 3. Request data
      this._fetchServerData()
        .then(this._appendServerData)
        .then(() => {
          // 4. Update field
          this._viewUpdater(this._cells.slice());
    
          // 5. Unlock cells
          this._unlockCells();
          this._canInput = true;
        });
    }

    // 6. Check if possible moves
  }


  _unlockCells() {
    this._cells.forEach(cell => cell.isLocked = false);
  }


  getCells() {
    return this._cells;
  }

  getNonEmptyCells() {
    return this._cells.filter(cell => cell.value && cell.value > 0);
  }
}


export default GameEngine;
