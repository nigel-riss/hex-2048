
class Game {
  constructor() {
    this.cells = null;
  }

  init(size) {
    this.size = size;
    this.cells = [];
    const radius = size - 1;

    for (let x = -radius; x <= radius; x++) {
      for (let y = -radius; y <= radius; y++) {
        for (let z = -radius; z <= radius; z++) {  // TODO: Optimize here
          if ((x + y + z) === 0) {
            this.cells.push({
              x,
              y,
              z,
              value: 0,
            });
          }
        }
      }
    }

    console.log(this.cells);
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

  }
}


export default Game;
