import React from 'react';


const ServerSelector = (props) => {
  return (
    <div className="server-selector">
      <p>RNG Server:&nbsp;</p>
      <select
        id="url-server"
        onChange={(e) => {
          console.log(e);
        }}
      >
        <option
          id="remote"
          value="//68f02c80-3bed-4e10-a747-4ff774ae905a.pub.instances.scw.cloud"
        >
          Remote server
        </option>
        <option
          id="localhost"
          value="http://localhost:13337/"
        >
          Local server
        </option>
      </select>
    </div>
  );
};


export default ServerSelector;
