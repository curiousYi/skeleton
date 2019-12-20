module.exports = {
    entry: './app/index.jsx',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    output: {
      path: __dirname + '/public',
      publicPath: '/public',
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: './dist'
    }
  };