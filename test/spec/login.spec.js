const assert = require('assert');

const timing = require('../helpers/timing');
const LoginPage = require('../pageobjects/login');

// const protocol = 'https://',
//     host = '127.0.0.1',
//     serverPort = 8443,
//     baseUrl = `${protocol}${host}:${serverPort}`,
//     consoleUrl = `${baseUrl}/console`;

describe('Openshift login page', () => {
  describe('oauth flow', () => {
    it('should login and redirect to the catalog page', () => {
      const lp = new LoginPage();
      const user = {
        name: 'e2e-user',
        pass: 'e2e-user'
      };
      lp.visit();
      lp.login(user.name, user.pass);

      const catalogHeading = $('h1');
      catalogHeading.waitForExist(timing.waitForElement);
      assert.equal(catalogHeading.getText(), 'Browse Catalog');

    });
  });
});
