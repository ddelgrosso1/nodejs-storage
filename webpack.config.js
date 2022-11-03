const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /node_modules[\\/]retry-request/,
        use: 'null-loader',
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '../../../package.json': path.resolve(__dirname, 'package.json'),
      '../../package.json': path.resolve(__dirname, 'package.json'),
    },
    fallback: {
      url: require.resolve('url'),
      stream: require.resolve('stream-browserify'),
      https: require.resolve('https-browserify'),
      http: require.resolve('stream-http'),
      crypto: require.resolve('crypto-browserify'),
      assert: require.resolve('assert/'),
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      process: require.resolve('process/browser'),
      zlib: require.resolve('browserify-zlib'),
      buffer: require.resolve('buffer/'),
      net: false,
      tls: false,
      fs: false,
      child_process: false,
    },
  },
  output: {
    filename: 'nodejs-storage.js',
    path: path.resolve(__dirname, 'build'),
  },
};
