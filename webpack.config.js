const path = require(`path`);


module.exports = {
  mode: `development`,
  entry: path.resolve(__dirname, `./src/index.js`),
  output: {
    path: path.resolve(__dirname, `dist`),
    filename: `game.bundle.js`,
  },
  devServer: {
    contentBase: path.resolve(__dirname, `dist`),
    port: 8080,
  }
}
