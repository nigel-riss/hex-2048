import React from 'react';
import Hex from './Hex.jsx';
import {
  GAME_FIELD_WIDTH,
} from '../utils/const.js';


// width = (4 * x * number) - ((number - 1) * x);
// width = 4 * x * number - number * x - x;
// width = x * (4 * number - number - 1);
// width = x * (3 * number - 1);
// x = width / (3 * number - 1);

// w = sqrt(3) * size;
// size = w / sqrt(3) * 2

const GridLayout = (props) => {
  const {
    cells,
    size,
  } = props;

  const fieldWidth = GAME_FIELD_WIDTH;
  const fieldHeight = GAME_FIELD_WIDTH / Math.sqrt(3) * 2;

  return (
    <div
      className="layout-grid"
      style={{
        width: fieldWidth,
        height: fieldHeight,
      }}
    >
      {cells.map(cell => (
        <Hex
          x={cell.x}
          y={cell.y}
          z={cell.z}
          offsetTop={fieldHeight / 2}
          offsetLeft={fieldWidth / 2}
          value={cell.value}
          radius={GAME_FIELD_WIDTH / (3 * size - 1)}
          key={`${cell.x}-${cell.y}-${cell.z}`}
          isDisplayLabel
          isDisplayCoords
        />
      ))}
    </div>
  );
};


export default GridLayout;
