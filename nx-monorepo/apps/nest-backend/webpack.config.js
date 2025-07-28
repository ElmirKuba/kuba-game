const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const webpack = require('webpack');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/nest-backend'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    }),
    new webpack.WatchIgnorePlugin({
      paths: [
        /\.sql$/,
        /\.json$/,
        /\.schema\.ts$/,
        /[/\\]migrations[/\\]/,
        /[/\\][^/\\]*migrations[^/\\]*[/\\]/,
      ],
    }),
  ],
  watchOptions: {
    ignored: [
      '**/*.sql',
      '**/*.json',
      '**/*.schema.ts',
      '**/migrations/**',
      '**/*migrations*/**',
    ],
  },
  devServer: {
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        ignored: [
          '**/*.sql',
          '**/*.json',
          '**/*.schema.ts',
          '**/migrations/**',
          '**/*migrations*/**',
        ],
      },
    },
  },
};
