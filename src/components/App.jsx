import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import ServerSelector from './ServerSelector.jsx';
import LevelSelector from './LevelSelector.jsx';
import GridLayout from './GridLayout.jsx';


const App = (props) => {
  const {
    game,
  } = props;

  return (<Router>
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
      cells={game.getCells()}
      size={game.getSize()}
    />
  </Router>);
};


export default App;
