import React from 'react';
import ServerSelector from './ServerSelector.jsx';


const App = () => {
  return (<>
    <header>
      <div className="caption">
        <h1>Hexagonal 2048</h1>
        <p>Test task for Evolution TS bootcamp</p>
      </div>

      <ServerSelector/>
    </header>
  </>);
};


export default App;
