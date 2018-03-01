FROM node:latest

RUN apt-get update -y -q
RUN apt-get install -y -q unzip xvfb

# Install Chromedriver 2.8
ADD chromedriver_linux64.zip /srv/
RUN unzip /srv/chromedriver_linux64.zip -d /usr/local/bin && rm /srv/chromedriver_linux64.zip

ENV DISPLAY :99

# Install Xvfb init script
ADD xvfb_init /etc/init.d/xvfb`
RUN chmod a+x /etc/init.d/xvfb
ADD xvfb-daemon-run /usr/bin/xvfb-daemon-run
RUN chmod a+x /usr/bin/xvfb-daemon-run

# Install Chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update \
    && apt-get install -y google-chrome-stable

# Allow root to execute Google Chrome by replacing launch script
ADD google-chrome-launcher /usr/bin/google-chrome
RUN chmod a+x /usr/bin/google-chrome

# Yarn seems to complain about the global path in a container
ENV PATH="$(yarn global bin):${PATH}"

# THE SMOKE TEST STUFF
# handle app dependencies as a separate layer
# this already defines selenium-standalone as a dependency
# so we shouldn't need to install selenium, java, etc.
# ADD package.json /tmp/dependencies/package.json

# RUN cd /tmp/dependencies && yarn install

# RUN mkdir -p /opt/origin-smoke-test \
#    && cp -a /tmp/dependencies/node_modules /opt/origin-smoke-test

# RUN /opt/origin-smoke-test/node_modules/.bin/webdriver-manager update

WORKDIR /opt/origin-smoke-test

# dont clobber node_modules.
# skipping the above optimization in favor of just getting things working, hopefully
ADD . /opt/origin-smoke-test
RUN cd /opt/origin-smoke-test \
    && yarn install \
    && /opt/origin-smoke-test/node_modules/.bin/webdriver-manager update

# not sure we need this, actually.
EXPOSE 3000

# run vs run_once: we don't want to webdriver update inside the container,
# that should happen in the build process ONLY
# CMD ["yarn", "test:run"]
# CMD ["/opt/origin-smoke-test/node_modules/.bin/protractor", "protractor.conf.js"]
CMD ["/opt/origin-smoke-test/run.sh"]
