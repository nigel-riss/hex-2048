import React from 'react';


const ServerSelector = (props) => {
  const {
    onServerSelect,
    servers,
    defaultServer,
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
        defaultValue={servers[defaultServer].url}
      >
        {Object.keys(servers).map(id => (
          <option
            id={id}
            key={id}
            value={servers[id].url}
          >
            {servers[id].title}
          </option>
        ))}
      </select>
    </div>
  );
};


export default ServerSelector;
