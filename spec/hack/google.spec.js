// NOTE:
// so far this works after
// yarn run selenium-standalone-install
// yarn run selenium-standalone-start
// yarn run test
// NOTE: it then breaks inside of the describe()
// NOTE: it wont run if you copy/paste the `yarn run test`
//   contents straight into the terminal (confusing?)
console.log('google.spec.js');
var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;

console.log('chromedriver path', path);

// chrome webdriver is installed separately.
var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

console.log('webdriver');
var driver = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.chrome()).
    build();

console.log('webdriver 2', driver.toString());
describe('basic test', function () {
    console.log('describe');
    it('should be on correct page', function () {
        console.log('it');
        var match = 'webdriver - Google Search',
            title = '';
        console.log('go!');
        driver.get("http://www.google.com");
        driver.findElement(webdriver.By.name("q")).sendKeys("webdriver");
        driver.findElement(webdriver.By.name("btnG")).click();

        // wait for page title, we know we are there
        waitsFor(function () {
            console.log('waiting...');
            driver.getTitle().then(function (_title) {
                title = _title;
            });
            return title === match;
        }, 'Test page title, so we know page is loaded', 6000);

        // test title is correct
        runs(function () {
            console.log('runs?');
            expect(title).toEqual(match);
        });
    });
});
