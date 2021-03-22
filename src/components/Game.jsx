import React, {useEffect, useState} from 'react';
import {
  Servers,
  DEFAULT_SERVER,
} from '../utils/const.js';
import ServerSelector from './ServerSelector.jsx';
import LevelSelector from './LevelSelector.jsx';
import GridLayout from './GridLayout.jsx';


const Game = (props) => {
  const {
    size,
    gameEngine,
  } = props;

  const [cells, setCells] = useState([]);
  const [serverUrl, setServerUrl] = useState(Servers[DEFAULT_SERVER].url);

  useEffect(() => {
    gameEngine.init(size, setCells, serverUrl);
    setCells(gameEngine.getCells());
  }, [size, serverUrl]);

  return (<>
    <header>
      <div className="caption">
        <h1>Hexagonal 2048</h1>
        <p>Test task for Evolution TS bootcamp</p>
      </div>

      <div className="controls">
        <LevelSelector/>
        <ServerSelector
          servers={Servers}
          onServerSelect={(serverUrl) => {
            setServerUrl(serverUrl);
          }}
          defaultServer={DEFAULT_SERVER}
        />
      </div>

      <div>Game Status:&nbsp;
        <span data-status={gameEngine.getStatus()}>
          {gameEngine.getStatus()}
        </span>
      </div>
    </header>

    <GridLayout
      cells={cells}
      size={size}
    />
  </>);
};


export default Game;
