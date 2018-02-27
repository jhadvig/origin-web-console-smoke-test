const Page = require('./page');
const environment = require('../helpers/environment');
const timing = require('../helpers/timing');
const logger = require('../helpers/logger');

class LoginPage extends Page {
  get usernameInput() {
    logger.log('aye?', $('#inputUsername'));
    return $('#inputUsername');
  }
  get passwordInput() {
    logger.log('aye?', $('#inputPassword'));
    return $('#inputPassword');
  }
  get loginButton() {
    logger.log('aye?', browser.element('button[type="submit"]'));
    return browser.element('button[type="submit"]');
  }
  visit() {
    super.visit(environment.consoleUrl);
  }
  login(username, password) {
    // this.usernameInput.setValue(username);
    $('#inputUsername').setValue(username);
    // this.usernameInput.setValue(password);
    $('#inputPassword').setValue(password);
    // this.loginButton.click();
    $('button[type="submit"]').click();
    // NOTE: timeouts make flaky tests.
    browser.pause(timing.oauthRedirect);
  }
}

module.exports = LoginPage;
