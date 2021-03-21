import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import GameEngine from './game.js';


const rootEl = document.querySelector(`#root`);
const game = new GameEngine();

ReactDOM.render(
  <App
    gameEngine={game}
  />,
  rootEl,
);


console.log(`hello hex`);
