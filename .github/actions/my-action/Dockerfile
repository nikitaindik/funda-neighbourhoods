FROM node:12

RUN apt update \
    # See https://crbug.com/795759
    && apt install -yq libgconf-2-4 \
    # Install latest chrome dev package, which installs the necessary libs to
    # make the bundled version of Chromium that Puppeteer installs work.
    && apt install -y wget xvfb --no-install-recommends

# Testing Chromium extensions with Puppeteer doesn't work on Chromium > 92 due to a bug
# Bug: https://bugs.chromium.org/p/chromium/issues/detail?id=1250991&q=background_page&can=2
# So installing an older version here instead of latest stable
# To get download URL for a different version, go to https://www.ubuntuupdates.org/pm/google-chrome-stable,
# pick a version from the list and substitute it in the URL. You may need to add "-1" after version.
RUN wget --no-verbose -O /tmp/chrome.deb https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_90.0.4430.72-1_amd64.deb \
    && apt install -y /tmp/chrome.deb \
    && rm /tmp/chrome.deb

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
