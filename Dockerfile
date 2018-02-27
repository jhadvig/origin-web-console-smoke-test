#
# NOTE: use selenium base to avoid the hassle of java!
#
# best practices
# https://docs.docker.com/v17.09/engine/userguide/eng-image/dockerfile_best-practices/#use-multi-stage-builds
#
# https://hub.docker.com/r/selenium/standalone-chrome/
# FROM selenium/standalone-firefox:latest
FROM selenium/base:latest

# install yarn & node
#RUN apt-get update \
    #&& apt-get --no-install-recommends -y -q install curl wget
    # https://nodejs.org/en/download/package-manager/
  #  && apt-get -y install nodejs
    # https://yarnpkg.com/lang/en/docs/install/
  #  && apt-get install yarn
# RUN apt-get update && apt-get install nodejs
RUN apt-get update && \
    apt-get install curl && \
    apt-get install nodejs &&
    apt-get install yarn

# handle app dependencies as a separate layer
# this already defines selenium-standalone as a dependency
# so we shouldn't need to install selenium, java, etc.
ADD package.json /tmp/dependencies/package.json

RUN cd /tmp/dependencies && yarn install

RUN mkdir -p /opt/origin-smoke-test \
    && cp -a /tmp/dependencies/node_modules /opt/origin-smoke-test

WORKDIR /opt/origin-smoke-test

ADD . /opt/origin-smoke-test

EXPOSE 3000

CMD ["yarn", "test:run_once"]
