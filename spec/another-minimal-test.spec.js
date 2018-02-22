var selenium = require('selenium-webdriver');

// try to fix the chrome path problem without having to do
// annoying PATH variable updates, we'd rather have the tests
// self-contained, reproducible across environments, with
// everything either in test files, config, or in package.json
// run scripts.
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;

var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

// this is something new & annoying built into node.js
process.on('unhandledRejection', error => {
  console.log('A rejected promise was not handled properly:', error.test);
});


describe('Selenium Tutorial', function() {

    // Open the TECH.insight website in the browser before each test is run
    beforeEach(function(done) {
        this.driver = new selenium.Builder().
            withCapabilities(selenium.Capabilities.chrome()).
            build();

        this.driver.get('http://www.techinsight.io/').then(done);
    });

    // Close the website after each test is run (so that it is opened fresh each time)
    afterEach(function(done) {
        this.driver.quit().then(done);
    });

    // Test to ensure we are on the home page by checking the <body> tag id attribute
    it('Should be on the home page', function(done) {
        var element = this.driver.findElement(selenium.By.tagName('body'));

        element.getAttribute('id').then(function(id) {
            expect(id).toBe('home');
            done();
        });
    });

    // Test the navigation bar by clicking on the 'REVIEW' link and checking the URL changes to '/review'
    it('Has a working nav', function(done) {
        var element = this.driver.findElement(selenium.By.linkText('REVIEW'));

        element.click();

        this.driver.getCurrentUrl().then(function(value) {
            expect(value).toContain('/review');
            done();
        });
    });
});
