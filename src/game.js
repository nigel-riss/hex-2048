import {postData} from './api.js';


const Direction = {
  'Q': {x: -1, y: 1,  z: 0},
  'W': {x: 0,  y: 1,  z: -1},
  'E': {x: 1,  y: 0,  z: -1},
  'A': {x: -1, y: 0,  z: 1},
  'S': {x: 0,  y: -1, z: 1},
  'D': {x: 1,  y: -1, z: 0},
};


class GameEngine {
  constructor() {
    this._cells = null;
    this._size = null;
    this._viewUpdater = null;
    this._serverURL = null;
  }

  init(size, viewUpdater, serverURL) {
    this._size = size;
    this._viewUpdater = viewUpdater;
    this._serverURL = serverURL;

    window.removeEventListener(`keyup`, this._keyboardInputHandler);

    this._initCells();

    window.addEventListener(`keyup`, this._keyboardInputHandler);
    console.log(`Initializing game`, size, serverURL);

    this._fetchServerData();
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
              // value: rndValue !== 1 ? rndValue : 0,
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

  findCell({x, y, z}) {
    return this._cells
      .find(cell => cell.x === x && cell.y === y && cell.z === z);
  }

  getCells() {
    return this._cells;
  }

  _getNonEmptyCells() {
    return this._cells.filter(cell => cell.value && cell.value > 0);
  }

  getSize() {
    return this._size;
  }

  _fetchServerData() {
    postData(this._serverURL, this._size, this._getNonEmptyCells())
      .then((response) => {
        console.log(response);
        this._cells.concat(response);
        this._cells = [...this._cells, ...response];
        this._viewUpdater(this._cells.slice());
      })
  }

  turn(direction) {
    // 1. Wait input
    const currCell = this.findCell(Direction[direction]);
    currCell.value++;
    console.log(Direction[direction]);
    this._viewUpdater(this._cells.slice());

    // 2. Shift cells

    // 3. Request data

    // 4. Update field

    // 5. Check if possible moves
  }
}


export default GameEngine;
