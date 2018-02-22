const selenium = require('selenium-webdriver');
// might can deconstruct this bad boy
const {Builder, By, Key, until} = require('selenium-webdriver');

// try to fix the chrome path problem without having to do
// annoying PATH variable updates, we'd rather have the tests
// self-contained, reproducible across environments, with
// everything either in test files, config, or in package.json
// run scripts.
//
// DRIVERS:
// https://github.com/SeleniumHQ/selenium/tree/master/javascript/node/selenium-webdriver
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;

const service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

// this is something new & annoying built into node.js
process.on('unhandledRejection', error => {
  console.log('A rejected promise was not handled properly:', error.test);
});

// mmm.
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 10;

// CHROME
// const driver = new selenium.Builder()
//                     .withCapabilities(selenium.Capabilities.chrome())
//                     .build();

// FIREFOX
// doesn't seem to handle await very well...
// const driver = await new Builder().forBrowser('firefox').build();
const driver = new Builder().forBrowser('firefox').build();

describe('Selenium Tutorial', () => {

    // Open the TECH.insight website in the browser before each test is run
    beforeEach((done) => {
        driver.get('http://www.techinsight.io/').then(done);
    });

    // Close the website after each test is run (so that it is opened fresh each time)
    afterEach((done) => {
        driver.quit().then(done);
    });

    // Test to ensure we are on the home page by checking the <body> tag id attribute
    it('Should be on the home page', (done) => {
        const element = driver.findElement(selenium.By.tagName('body'));

        element.getAttribute('id').then((id) => {
            expect(id).toBe('home');
            done();
        });
    });

    // Test the navigation bar by clicking on the 'REVIEW' link and checking the URL changes to '/review'
    it('Has a working nav', (done) => {
        const element = driver.findElement(selenium.By.linkText('REVIEW'));

        element.click();

        driver.getCurrentUrl().then((value) => {
            expect(value).toContain('/review');
            done();
        });
    });
});
