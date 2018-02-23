// https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Write-a-Simple-Test
// familiar tools are used for all of this:
//   - describe & it come from Mocha
//   - expect comes from Chai
//   - jQuery is used as the selector for Cy
// describe('My First Test', () => {
//
//   it('Does not do much!', () => {
//     expect(true).to.equal(true);
//   });
//
//   it('Does not do much 2!', () => {
//     expect(true).to.equal(false);
//   });
//
// });


// ref for writing up a cleaner test file by
// using some vars to DRY things up
// https://github.com/benjaminapetersen/angular-extension-registry/blob/master/gulpfile.js
// https://github.com/benjaminapetersen/js-lunch-and-learn/blob/master/projects/gulp-angularJS/gulpfile.js#L14
// env vars need to be able to config this
// prob in a global config we can require, or something.
// perhaps in the cyprress config file
const protocol = 'https://',
    host = '127.0.0.1',
    serverPort = 8443,
    // will use when we setup e2e-test
    baseUrl = protocol + host + ':' + serverPort,
    loginUrl = baseUrl + '/login',
    consoleUrl = baseUrl + '/console';

const withConfigUrl = {
  console: '/console'
}

describe('Origin Web Console', () => {
  describe('Visit the console', () => {
    describe('and login', () => {
      it('should successfully login', () => {
        console.log('test');
        console.log('login',consoleUrl);
        console.log('console',consoleUrl);
        // cy.visit(consoleUrl);
        // can't load it:
        // https://docs.cypress.io/guides/guides/web-security.html#Form-Submission-Redirects
        // not sure if there is a workaround or not.  boo.
        cy.visit(withConfigUrl.console);

      });
    });
  });
});
