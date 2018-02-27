'use strict';

const isMac = /^darwin/.test(process.platform);
const isDocker = require('is-docker')();
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
const jasmineReporters = require('jasmine-reporters');

const screenshotReporter = new HtmlScreenshotReporter({
  cleanDestination: isMac ? true : false,
  dest: './test/tmp/screenshots',
  filename: 'protractor-e2e-report.html',
  takeScreenShotsOnlyForFailedSpecs: true,
  pathBuilder: function(currentSpec, suites, browserCapabilities) {
   return browserCapabilities.get('browserName') + '/' + currentSpec.fullName;
  }
});

const junitReporter = new jasmineReporters.JUnitXmlReporter({
   consolidateAll: true,
   savePath: 'test/junit',
   filePrefix: 'e2e-results'
});


exports.config = {
  // skip webdriver manager, selenium, etc
  directConnect: true,

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      // We must disable the Chrome sandbox when running Chrome inside Docker
      // (Chrome's sandbox needs more permissions than Docker allows by default)
      // flags: isDocker ? ['--no-sandbox'] : []
      args: isDocker ? ["--no-sandbox", "--headless", "--disable-gpu", "--window-size=1200x800"] : []
    }
  },

  specs: ['test/spec/**/*.spec.js'],

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    isVerbose: true,
    includeStackTrace: true,
    // noop for dot reporter, using better reporters below
    print: function() {}
  },
  onPrepare: function() {
    browser.driver.manage().window().setSize(1200, 800);
    // we don't want to act like we are testing
    // an angular site. lets just pretend its vanilla.
    browser.ignoreSynchronization = true;

    jasmine.getEnv().addReporter(screenshotReporter);

    jasmine.getEnv().addReporter(new SpecReporter({
      displayStacktrace: true,
      displaySuccessfulSpec: false,
      displayFailedSpec: true
    }));

    jasmine.getEnv().addReporter(junitReporter);


  },

};
