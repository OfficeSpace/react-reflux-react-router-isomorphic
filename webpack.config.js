var path = require('path');

module.exports = {
  entry: "./app/client",

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'jsx-loader'
      }
    ]
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    sourceMapFilename: '[file].map',
    path: path.join('public', 'js'),
    publicPath: '/js/',
  }
};

