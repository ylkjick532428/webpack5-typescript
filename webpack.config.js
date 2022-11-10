const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    test: ['./src/main.tsx'],
    index: ['./src/index.tsx'],
    meeting: ['./src/meeting.tsx']
  },
  output: {
    path: path.resolve(__dirname, './static'),
    filename: 'bundle.js'
  },
  output: {
    path: path.resolve(__dirname, '/static'),
    hashDigestLength: 5,
    filename: '[name].min.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  devServer: {
    host: '0.0.0.0',
    port: 9999,
    static: {       
      directory: path.resolve(__dirname, './')
    },
  }
}