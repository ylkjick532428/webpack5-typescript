const webpack = require('webpack');
const path = require('path')
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');

const args = process.argv.slice(2);
let https = false;
let disableCORP = true;
if (args.includes('--https')) https = true;
if (args.includes('--corp')) disableCORP = false;
console.log('https', https);
console.log('disableCORP', disableCORP);

function runFunc(err) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at http://127.0.0.1:9999/index.html');
}

new WebpackDevServer(webpack(webpackConfig), {
  static: {       
    directory: path.resolve(__dirname, './')
  },
  hot: true,
  host: '0.0.0.0',
  open: 'http://127.0.0.1:9999/index.html',
  headers: {
    // 'Cross-Origin-Embedder-Policy': 'unsafe-none',
    // 'Cross-Origin-Opener-Policy': 'unsafe-none',
  },
  proxy: [{
    path: '/meeting.html',
    target: 'http://127.0.0.1:9998/'
  }]
}).listen(9999, '0.0.0.0', runFunc);

new WebpackDevServer(webpack(webpackConfig), {
  static: {       
    directory: path.resolve(__dirname, './')
  },
  hot: true,
  host: '0.0.0.0',
  headers: {
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Cross-Origin-Opener-Policy': 'same-origin',
  },
}).listen(9998, '0.0.0.0', runFunc);