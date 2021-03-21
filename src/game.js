
class Game {
  constructor() {
    this.cells = null;
  }

  init(size) {
    this.cells = [];

    for (let x = -size; x <= size; x++) {
      for (let y = -size; y <= size; y++) {
        for (let z = -size; z <= size; z++) {  // TODO: Optimize here
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

    console.log(cells);
  }

  getCells() {
    return this.cells;
  }

  getNonEmptyCells() {
    return this.cells.filter(cell => cell.value && cell.value > 0);
  }

  getServerData() {
    
  }

  turn(direction) {

  }
}
