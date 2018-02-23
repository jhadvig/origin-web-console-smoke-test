# Origin Web Console Smoke Test POC

POC smoke tests to run in a pod and target origin web console

# Cypress

Cypress is an all-in-one tool for running e2e style tests. It wraps webkit and can work in a headless mode, as
well as a really slick UI.  See [the docs](docs.cypress.io) for details.

Running cypress:

```bash
# run the tests headless
# https://docs.cypress.io/guides/guides/launching-browsers.html
# by default this runs Electron in headless mode.
yarn run test:run
# run the cypress UI for a mixed manual/automated flow
# by default this runs Electron as a browser
yarn run test:visual
# manually use other browsers with the --browser flag
# currently only webkit browsers are available.  
cypress run --browser chrome
```

Cypress automatically configures the launched browser to [disable certain functionality](https://docs.cypress.io/guides/guides/launching-browsers.html#Disabled-Barriers). This
is supposed to make the test less flaky and easier to maintain.
