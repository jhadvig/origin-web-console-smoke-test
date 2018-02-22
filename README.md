# Origin Web Console Smoke Test POC

POC smoke tests to run in a pod and target origin web console

# installation

Using `yarn`, at this point:

```bash
# install via package.json
yarn install
# need to install chromedriver
yarn run chromedriver-install
# get selenium-standalone server running
yarn run selenium-standalone-install
yarn run selenium-standalone-start

# run a test?
yarn run test
```


# Selenium

[Selenium standalone](https://github.com/vvo/selenium-standalone) is handy for getting a server up and running.


<!--
Selenium
- https://github.com/vvo/selenium-standalone

Jasmine
- https://jasmine.github.io/2.0/node.html
- https://jasmine.github.io/2.3/node.html#section-Configuration

Jasmine, Selenium
- https://marmelab.com/blog/2016/04/19/e2e-testing-with-node-and-es6.html
- https://team.goodeggs.com/getting-started-with-selenium-webdriver-for-node-js-f262a00c52e1

Mocha, Selenium
- https://mochajs.org/
- https://blog.testproject.io/2017/06/07/javascript-testing-with-selenium-webdriver-mocha/

ES6, Imports
- https://x-team.com/blog/setting-up-javascript-testing-tools-for-es6/

-->
