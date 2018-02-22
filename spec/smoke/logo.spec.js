// resources:
// - https://marmelab.com/blog/2016/04/19/e2e-testing-with-node-and-es6.html
// - https://team.goodeggs.com/getting-started-with-selenium-webdriver-for-node-js-f262a00c52e1
// - https://www.sitepoint.com/how-to-test-your-javascript-with-selenium-webdriver-and-mocha/
// configuring all the things, if we want that complexity:
// - https://x-team.com/blog/setting-up-javascript-testing-tools-for-es6/
// can we do this?
// import selenium as selenium from 'selenium';
// or do we need to do this:
const webdriver = require('selenium-webdriver');

const baseUrl = 'https://127.0.0.1:8443';

const driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

const By = webdriver.By;

beforeEach(() => {
  driver.navigate().to(baseUrl);
});

// after will accept a promise as a return value
afterEach(() => driver.quit());

describe('login form', () => {

  it('should load a page with an openshift logo image', () => {
    // NOTE: webdriver promises are not normal promises
    // each time a task is called w/o resolution, it adds the
    // task to a queue.  This is the webdriver control flow.
    // it will execute tasks in the order they were scheduled,
    // moving either when a promise resolves, or on the next
    // tick in the JavaScript event loop.
    driver
      .then(() => driver.findElement(By.css('#brand img')))
      .then(element => element.getAttribute('alt')
      .then(value => console.log('logo alt value:', value));

  });

});
