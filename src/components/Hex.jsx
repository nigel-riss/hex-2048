import React from 'react';


const Hex = (props) => {
  const {
    fillColor,
    strokeColor,
    text,
    width,
    height,
    x,
    y,
    z,
    value,
  } = props;

  return (
    <div
      className="hex"
      data-x={x}
      data-y={y}
      data-z={z}
      data-value={value}
      style={{
        width,
        height,
      }}
    >
      <svg viewBox="-100 -100 200 200">
        <g transform="rotate(0)" fill="rgba(255, 255, 255, 0.5)" stroke="black">
          <polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon>
        </g>
      </svg>

    </div>
  );
};


export default Hex;
