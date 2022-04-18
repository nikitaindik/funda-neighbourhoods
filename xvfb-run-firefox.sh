#!/bin/sh

PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true xvfb-run --auto-servernum jest --config=e2e/jest.config.js
