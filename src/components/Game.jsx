import React, {useEffect, useState} from 'react';
import ServerSelector from './ServerSelector.jsx';
import LevelSelector from './LevelSelector.jsx';
import GridLayout from './GridLayout.jsx';


const Game = (props) => {
  const {
    size,
    gameEngine,
  } = props;

  const [cells, setCells] = useState([]);

  useEffect(() => {
    gameEngine.init(size, setCells);
    setCells(gameEngine.getCells());
  }, [size]);

  return (<>
    <header>
      <div className="caption">
        <h1>Hexagonal 2048</h1>
        <p>Test task for Evolution TS bootcamp</p>
      </div>

      <div className="controls">
        <LevelSelector/>
        <ServerSelector/>
      </div>
    </header>

    <GridLayout
      cells={cells}
      size={size}
    />
  </>);
};


export default Game;
