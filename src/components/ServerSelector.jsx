import React from 'react';


const ServerSelector = (props) => {
  const {
    onServerSelect,
    servers
  } = props;

  return (
    <div className="server-selector">
      <p>RNG Server: </p>
      <select
        id="url-server"
        onChange={(e) => {
          const serverURL = e.currentTarget.value;
          onServerSelect(serverURL);
        }}
      >
        {Object.keys(servers).map(id => (
          <option
            id={id}
            value={servers[id].url}
            key={id}
          >
            {servers[id].title}
          </option>
        ))}
      </select>
    </div>
  );
};


export default ServerSelector;
