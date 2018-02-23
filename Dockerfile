# already has a docker container:
# https://docs.cypress.io/guides/guides/continuous-integration.html#Dependencies
FROM cypress/base
RUN npm install
RUN $(npm bin)/cypress run
