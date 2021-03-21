import React from 'react';
import Hex from './Hex.jsx';

const buildGrid = (size) => {
  const hexes = [];
  for (let x = -size; x <= size; x++) {
    for (let y = -size; y <= size; y++) {
      for (let z = -size; z <= size; z++) {
        if (x + y + z === 0) {
          hexes.push(<Hex
            x={x}
            y={y}
            z={z}
            value={0}
            width={`100px`}
            height={`100px`}
          />);
        }
      }
    }
  }
  return hexes;
  // for each -N ≤ x ≤ +N:
  //   for each max(-N, -x-N) ≤ y ≤ min(+N, -x+N):
  //       var z = -x-y
  //       results.append(cube_add(center, Cube(x, y, z)))
}


const GridLayout = (props) => {
  const {
    size,
  } = props;

  return (
    <div className="layout-grid">
      {buildGrid(1)}
    </div>
  );
};


export default GridLayout;
