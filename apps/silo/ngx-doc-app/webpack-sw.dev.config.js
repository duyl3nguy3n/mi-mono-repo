// DEV Webpack configuration used to build the service worker

const path = require('path');

module.exports = {
  target: 'node',
  mode: 'none',
  // WARNING: commented out to disable source maps
  //devtool: 'inline-source-map',
  entry: {
    index: path.join(
      __dirname,
      '..',
      '..',
      'libs',
      'silo',
      'ngx-lib',
      'src',
      'offline',
      'service-worker.ts',
    ),
  },
  resolve: { extensions: ['.js', '.ts'] },
  output: {
    path: path.join(
      __dirname,
      '..',
      '..',
      'dist',
      'apps',
      'silo',
      'ngx-doc-app',
    ),
    filename: 'service-worker.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          onlyCompileBundledFiles: true,
        },
      },
    ],
  },
  plugins: [],
};
