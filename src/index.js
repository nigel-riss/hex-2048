import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Game from './game.js';


const rootEl = document.querySelector(`#root`);
const game = new Game();

console.log(game.init(3));

ReactDOM.render(
  <App
    game={game}
  />,
  rootEl,
);


console.log(`hello hex`);
