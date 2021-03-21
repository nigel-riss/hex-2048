const sin60 = Math.sqrt(3);

// 3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0)
// var x = (M.f0 * h.q + M.f1 * h.r) * size.x;
// var y = (M.f2 * h.q + M.f3 * h.r) * size.y;

const hexToPixel = ({x, y, z, size}) => {
  const pixelX = size * 1.5 * x;
  const pixelY = -(sin60 / 2 * x + sin60 * y) * size;
  return {pixelX, pixelY};
};


export {
  hexToPixel,
};
