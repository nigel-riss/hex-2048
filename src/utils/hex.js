const sin60 = Math.sqrt(3);

const hexToPixel = ({x, y, z, size}) => {
  const pixelX = (1.5 * x) * size;
  const pixelY = (sin60 / 2 * y + sin60 * y) * size;
  return {pixelX, pixelY};
};


export {
  hexToPixel,
};
