'use strict';

const logger = require('../helpers/logger');
const timing = require('../helpers/logger');

class Page {
  visit (path) {
    logger.log('Visiting:', path);
    browser.url(path);
    // NOTE: timeouts make flaky tests.
    browser.pause(timing.initialVisit);
  }
}

module.exports = Page;
