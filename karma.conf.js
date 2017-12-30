const webpack = require('webpack');
const {npm_config_single_file: TEST_FILE} = process.env;

module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    autoWatch: true,
    client: {
      captureConsole: false,
      mocha: {
        ui: 'bdd',
        timeout: 10000
      }
    },
    singleRun: false,
    frameworks: ['mocha', 'sinon'],
    files: [
      'test.config.js'
    ],
    preprocessors: {
      'test.config.js': ['webpack', 'sourcemap']
    },
    reporters: ['spec'],
    webpack: {
      devtool: 'inline-source-map',
      module: {
        rules: [
          { test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
              babelrc: false,
              presets: ['es2015', 'react', 'es2017'],
              plugins: ['rewire', 'transform-decorators-legacy']
            }
          },
          {
            test: /\.json$/,
            loader: 'json'
          }
        ]
      },
      externals: {
        'jsdom': 'window',
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/addons': true,
        'react/lib/ReactContext': 'window',
        'sinon': 'window.sinon'
      },
      resolve: {
        modules: [
          'src',
          'node_modules'
        ],
        extensions: ['.json', '.js']
      },
      plugins: [
        new webpack.IgnorePlugin(/\.json$/),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          __CLIENT__: true,
          __SERVER__: false,
          __DEVELOPMENT__: true,
          __DEVTOOLS__: false,
          'process.env': {
            TEST_FILE: JSON.stringify(TEST_FILE || ''),
            NODE_ENV: JSON.stringify('development')
          }
        }),
        new webpack.ProvidePlugin({
          'global.sinon': 'sinon',
          'window.sinon': 'sinon',
          'sinon': 'sinon'
        })
      ]
    },
    webpackServer: {
      stats: 'errors-only'
    }
  });
};
