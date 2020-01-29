var webpack = require('webpack');

module.exports = {
    entry: './app/index.jsx',
    context: __dirname,
    module: {
      rules: [
        {
          test: /jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            presets: ['react', 'es2015', 'stage-2']
          }
        }
      ]
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    output: {
      path: __dirname, 
      filename: './public/bundle.js'
    } 
 };


  