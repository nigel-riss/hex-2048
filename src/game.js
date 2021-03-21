import {postData} from './api.js';


class Game {
  constructor() {
    this.cells = null;
  }

  init(size) {
    this.size = size;

    this._initCells();

    window.addEventListener(`keydown`, this._keyboardInputHandler);
  }

  _initCells() {
    this.cells = [];
    const radius = this.size - 1;
    for (let x = -radius; x <= radius; x++) {
      for (let y = -radius; y <= radius; y++) {
        for (let z = -radius; z <= radius; z++) {  // TODO: Can be optimized here
          if ((x + y + z) === 0) {
            const rndValue = 1 << Math.floor(Math.random() * 16);
            this.cells.push({
              x,
              y,
              z,
              value: rndValue !== 1 ? rndValue : 0,
            });
          }
        }
      }
    }
  }

  _keyboardInputHandler = (e) => {
    console.log(e.key);
  }

  getCells() {
    return this.cells;
  }

  getNonEmptyCells() {
    return this.cells.filter(cell => cell.value && cell.value > 0);
  }

  getSize() {
    return this.size;
  }

  fetchServerData() {

  }

  turn(direction) {
    // 3. Wait input

    // 4. Shift cells

    // 1. Request data

    // 2. Update field

    // ?. Check if possible moves
  }
}


export default Game;
