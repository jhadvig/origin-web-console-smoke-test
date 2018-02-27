# Smoke Tests


# Selenium Standalone

Selenium standalone server is used.

```bash
yarn install
# docs
# https://www.npmjs.com/package/selenium-standalone
# https://github.com/vvo/selenium-standalone
yarn run selenium-install
yarn run selenium-start
# or all in one
yarn run selenium
# best yet, just run this, which handles everything:
yarn run test
```

# webdriver.io

The [basic guide is here](http://webdriver.io/guide.html).

The [API docs are here](http://webdriver.io/api.html).

# Tests

As of this writing, we added [Mocha](wdio-mocha-framework) as
the test framework.  Write tests [like this](https://mochajs.org/#getting-started).
