FROM node:12

RUN apt update && apt install -y xvfb firefox-esr

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN npm ci

COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
