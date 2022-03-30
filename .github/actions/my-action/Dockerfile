FROM node:12.10.0

RUN apt-get update \
    # See https://crbug.com/795759
    && apt-get install -yq libgconf-2-4 \
    # Install latest chrome dev package, which installs the necessary libs to
    # make the bundled version of Chromium that Puppeteer installs work.
    && apt-get install -y wget xvfb --no-install-recommends
# && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
# && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
# && apt-get update \
# && apt-get install -y google-chrome-stable --no-install-recommends \
# && rm -rf /var/lib/apt/lists/*

RUN wget --no-verbose -O /tmp/chrome.deb https://security.ubuntu.com/ubuntu/pool/universe/c/chromium-browser/chromium-browser_80.0.3987.163-0ubuntu1_amd64.deb \
    && apt install -y /tmp/chrome.deb \
    && rm /tmp/chrome.deb

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
