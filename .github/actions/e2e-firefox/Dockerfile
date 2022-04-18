FROM node:12

RUN apt update && apt install -y xvfb firefox-esr

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV FIREFOX_BINARY_PATH /usr/bin/firefox-esr

RUN groupadd -r myuser && useradd -r -g myuser myuser
# USER myuser

COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
