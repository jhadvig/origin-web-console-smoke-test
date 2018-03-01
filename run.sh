#!/bin/bash

set -e

#source "$(dirname "${BASH_SOURCE}")/hack/lib/init.sh"

#os::log::info "Origin Web Console Smoke Test"
echo "Origin Web Console Smoke Test"
echo "CONSOLE_PUBLIC_URL: ${CONSOLE_PUBLIC_URL}"
echo "CONSOLE_USER_NAME: ${CONSOLE_USER_NAME}"
echo "CONSOLE_PASSWORD: ${CONSOLE_PASSWORD}"

RED='\033[0;31m'
NC='\033[0m'
if [ -z "$CONSOLE_PUBLIC_URL" ]; then
  echo -e "${RED}CONSOLE_PUBLIC_URL cannot be empty${NC}"
  exit 1
fi

# need to start xvfb, we copied the xvfb_init script here
# /etc/init.d/xvfb start
# this should start xvfb from our script...
# ./xvfb-daemon-run
# we copied xvfb here....
/etc/init.d/xvfb start
# give xvfb time to start up....
sleep 4

# COUNTER=1

#while true
#do
  # os::log::info  "Running Test: $COUNTER"
  echo "Running Test: $COUNTER"
  # $($(npm bin)/webdriver-manager update)
  ./node_modules/.bin/webdriver-manager update
  # MESSY VERSION:
  #$(CONSOLE_PUBLIC_URL="${CONSOLE_PUBLIC_URL}" \
  #  CONSOLE_USER_NAME=${CONSOLE_USER_NAME} \
  #  CONSOLE_PASSWORD=${CONSOLE_PASSWORD} \
  #  ./node_modules/.bin/protractor protractor.conf.js)
  # LESS MESSY VERSION:
  # OUTPUT=$(./node_modules/.bin/protractor protractor.conf.js)
  # CLEANER, BUT WHY STILL HAVE TO CATPURE THE OUTPUT?
  OUTPUT=$($(npm bin)/protractor protractor.conf.js)
  echo $OUTPUT

  # os::log::info  "Test Complete, exit code:" $?
  echo "Test Complete, exit code: ?"
  # COUNTER=$[$COUNTER +1]
#  sleep 25
#done
