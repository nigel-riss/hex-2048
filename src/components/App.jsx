import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Game from './Game.jsx';


const App = (props) => {
  const {
    gameEngine,
  } = props;

  return (<Router>
    <Switch>
      <Route
        path={`/`}
        render={({location}) => {
          const size = location.hash.replace(/\D/g, ``) || 2;
          console.log(size);
          return <Game
            gameEngine={gameEngine}
            size={size}
          />
        }}
      />
    </Switch>
  </Router>);
};


export default App;
