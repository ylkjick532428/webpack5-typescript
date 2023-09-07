/* eslint-disable no-console */
const webpack = require("webpack");
const fs = require("fs");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.config");
const args = process.argv.slice(2);
let isHttps = false;
let isCorp = false;
let httpsPort = 443;
let httpPort = 9999;
let proxyPort = 9998;
const serverName = "0.0.0.0";
if (args.includes("--https")) isHttps = true;
if (args.includes("--corp")) isCorp = true;
console.log({ isCorp, isHttps });

function green(text) {
  return "\u001b[1m\u001b[32m" + text + "\u001b[39m\u001b[22m";
}

function runFunc(err) {
  if (err) {
    console.log(err);
  }
  if (isCorp) {
    if (isCorp) {
      console.log("USE Shared array buffer test");
    }
    console.log(
      green(
        `Listening at ${
          isHttps ? "https://localhost" : `http://127.0.0.1:${httpPort}`
        }/index.html`,
      ),
    );
  }

  console.log("USE No Shared array buffer test, use below link");

  console.log(
    green(
      `Listening at http://127.0.0.1:${
        isCorp ? proxyPort : httpPort
      }/index.html`,
    ),
  );
}

if (isCorp) {
  new WebpackDevServer(
    {
      server: {
        type: isHttps ? "https" : "http",
        options: {
          key: fs.readFileSync("build-scripts/localhost.key"),
          cert: fs.readFileSync("build-scripts/localhost.crt"),
        },
      },
      client: {
        overlay: {
          errors: false,
          warnings: false,
          runtimeErrors: false,
        },
      },
      port: isHttps ? httpsPort : httpPort,
      host: serverName,
      static: "./",
      headers: {
        "Cross-Origin-Embedder-Policy": "credentialless",
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Resource-Policy": "cross-origin",
      },
      historyApiFallback: true,
      proxy: !isHttps
        ? [
            {
              path: "/lib/iframe",
              target: `http://127.0.0.1${proxyPort}/`,
            },
          ]
        : [],
      allowedHosts: "all",
    },
    webpack(webpackConfig),
  ).start(isHttps ? httpsPort : httpPort, serverName);
}

new WebpackDevServer(
  {
    server: {
      type: "http",
    },
    client: {
      overlay: {
        errors: false,
        warnings: false,
        runtimeErrors: false,
      },
    },
    port: isCorp ? proxyPort : httpPort,
    host: serverName,
    static: "./",
    headers: {
      "Cross-Origin-Embedder-Policy": "unsafe-none",
      "Cross-Origin-Opener-Policy": "unsafe-none",
    },
    open: isHttps
      ? "https://localhost/index.html"
      : `http://127.0.0.1:${httpPort}/index.html`,
    historyApiFallback: true,
  },
  webpack(webpackConfig),
).start(isCorp ? proxyPort : httpPort, serverName);
runFunc();
