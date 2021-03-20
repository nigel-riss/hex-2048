import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import ServerSelector from './ServerSelector.jsx';
import LevelSelector from './LevelSelector.jsx';
import GridSVG from './GridSVG.jsx';


const App = () => {
  return (<Router>
    <header>
      <div className="caption">
        <h1>Hexagonal 2048</h1>
        <p>Test task for Evolution TS bootcamp</p>
      </div>

      <ServerSelector/>
      <LevelSelector/>
    </header>

    <GridSVG
    />
  </Router>);
};


export default App;
