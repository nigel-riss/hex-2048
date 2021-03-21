import React from 'react';
import {
  FONT_SIZE_RATIO,
} from '../utils/const.js';
import {
  hexToPixel,
} from '../utils/hex.js';
import {
  ValueToColor,
} from '../utils/colors.js';


const getPosition = (x, y, z, size) => {
  const center = hexToPixel({x, y, z, size});
  return {
    top: center.pixelY,
    left: center.pixelX,
  };
};

const Hex = (props) => {
  const {
    x,
    y,
    z,
    value,
    radius,
    offsetTop,
    offsetLeft,
    isDisplayLabel,
    isDisplayCoords,
  } = props;

  const pos = getPosition(x, y, z, radius);

  return (
    <div
      className="hex"
      data-x={x}
      data-y={y}
      data-z={z}
      data-value={value}
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        top: pos.top + offsetTop - radius,
        left: pos.left + offsetLeft - radius,
        fontSize: `${radius / FONT_SIZE_RATIO}rem`
      }}
    >
      <svg viewBox="-100 -100 200 200">
        <g
          transform="rotate(0)"
          fill={isDisplayLabel ? ValueToColor[value] : `rgba(255, 255, 255, 0.5)`}
          stroke="black"
        >
          <polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon>
        </g>
        {isDisplayCoords && <g>
          <text
            transform={`
              translate(0, -70)
              translate(-5, 10)
            `}
            className="x-coord"
          >{x}</text>
          <text
            transform={`
              rotate(225)
              translate(0, -70)
              rotate(-225)
              translate(-15, -5)
            `}
            className="y-coord"
          >{y}</text>
          <text
            transform={`
              rotate(135)
              translate(0, -70)
              rotate(-135)
              translate(0, -5)
            `}
            className="z-coord"
            >{z}</text>
        </g>}
      </svg>
      {isDisplayLabel && <div className="hex__value">
        {value}
      </div>}
    </div>
  );
};


export default Hex;
