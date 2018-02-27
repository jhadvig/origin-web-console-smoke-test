// http://webdriver.io/guide/testrunner/configurationfile.html
// https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js
exports.config = {
  // selenium, if need custom
  // host: '',
  // port: '',
  // path: '',
  specs: [
    'test/spec/**/*.[Ss]pec.js'
  ],
  exclude: [],
  maxInstances: 1,
  capabilities: [{
    browserName: 'chrome',
    chromeOptions: {}
  },
  // {
  //   browserName: 'firefox',
  //   maxInstances: 2,
  //   specs: [
  //     'test/firefoxOnly/**/*.js'
  //   ],
  //   'moz:firefoxOptions' : {}
  // }
  ],
  debug: false,
  logLevel: 'silent',
  coloredLogs: true,
  deprecationWarnings: true,
  // if we want to set a "end after x number of tests fail"
  // bail: 0,
  screenshotPath: 'test_output/screenshots',
  baseUrl: 'https://127.0.0.1:8443/console',
  waitForTimeout: 5 * 1000,
  // plugins: {},
  framework: 'mocha',
  reporters: ['spec', 'junit','allure', 'json'],
  reporterOptions: {
      junit:  {
        outputDir:   './test_reports/junit-results/'
      },
      allure: {
        outputDir:   './test_reports/allure-results/'
      },
      json:   {
        outputDir:   './test_reports/json-results/'
      }
  },
  // jasmineNodeOpts: {}
  // cucumberOpts: {}
  // all kinds of callbacks up in here
  // onPrepare: function(config, capabilities) {}
};
