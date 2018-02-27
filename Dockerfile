# best practices
# https://docs.docker.com/v17.09/engine/userguide/eng-image/dockerfile_best-practices/#use-multi-stage-builds
#
# https://hub.docker.com/r/selenium/standalone-chrome/
# FROM selenium/standalone-firefox:latest
FROM node:latest

# the java/selenium stuff is plucked from:
# https://github.com/rodrigomiguele/docker-webdriverio/blob/master/Dockerfile
# java for selenium
RUN apt-get update && \
    apt-get install -y openjdk-7-jdk

# selenium itself
RUN curl -O http://selenium-release.storage.googleapis.com/2.53/selenium-server-standalone-2.53.1.jar && \
    mv selenium-server*.jar /opt/selenium-server.jar

# phantom... if we gotta fall back
# RUN wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2 && \
#     bunzip2 phantomjs-*.tar.bz2 && \
#     tar -xf phantomjs-*.tar && \
#     rm -f phantomjs-*.tar && \
#     mv phantomjs-* /opt/phantomjs/


# Google chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -y google-chrome-stable

# handle app dependencies as a separate layer
# this already defines selenium-standalone as a dependency
# so we shouldn't need to install selenium, java, etc.
ADD package.json /tmp/dependencies/package.json

RUN cd /tmp/dependencies && yarn install

RUN mkdir -p /opt/origin-smoke-test \
    && cp -a /tmp/dependencies/node_modules /opt/origin-smoke-test

WORKDIR /opt/origin-smoke-test

ADD . /opt/origin-smoke-test

# not sure we need this, actually.
EXPOSE 3000

# TODO: gotta pipe the CONSOLE_PUBLIC_URL environment var to this
CMD ["yarn", "test:run_once"]
