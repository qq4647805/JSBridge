var webpackCfg = require('./webpack.config');

module.exports = function(config) {
  config.set({
    basePath: '',
    // browsers: ['Chrome'],
    files: [
      'test/**.js'
    ],
    port: 9876,
    captureTimeout: 60000,
    frameworks: [ 'mocha','chai-sinon' ],
    client: {
      mocha: {
        // change Karma's debug.html to the mocha web reporter
        reporter: 'html',
        // require specific files after Mocha is initialized
        require: [require.resolve('bdd-lazy-var/bdd_lazy_var_global')],
        // custom ui, defined in required file above
        ui: 'bdd-lazy-var/global',
      }
    },
    singleRun: true,
    reporters: [ 'mocha'],
    preprocessors: {
      'test/**.js': [ 'webpack' ]
    },
    webpack: {
			module: {
				loaders: [{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: 'babel'
				}]
			}
		},
    // webpack: webpackCfg,
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only'
    },
    // coverageReporter: {
    //   dir: 'coverage/',
    //   reporters: [
    //     { type: 'html' },
    //     { type: 'text' }
    //   ]
    // }
  });
};
