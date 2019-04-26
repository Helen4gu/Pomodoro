// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

var webpackConfig = require('../../build/webpack.test.conf')

//process.env.NO_PROXY = 'localhost, 0.0.0.0/4201, 0.0.0.0/9876'
//process.env.no_proxy = 'localhost, 0.0.0.0/4201, 0.0.0.0/9876'
process.env.CHROME_BIN = require('puppeteer').executablePath()

if(process.env.TRAVIS) {
  configuration.browsers = ['Chrome_travis_ci'];
}

module.exports = function karmaConfig (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.

    // browsers: ['PhantomJS'],
    browsers: ['MyHeadlessChrome'],
    customLaunchers: {
      MyHeadlessChrome: {
        base: 'ChromeHeadless',
        /*flags: [
          '--no-sandbox',
          '--disable-gpu', 
          '--remote-debugging-port=9222',
          '--no-proxy-server',
          '--use-mock-keychain',
          '--disable-setuid-sandbox',
          '--disable-web-security'
        ]*/
      }
    },

    // frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'],
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec', 'coverage'],
    files: [
      // '../../node_modules/babel-polyfill/dist/polyfill.js',
      './index.js'
    ],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  })
}
