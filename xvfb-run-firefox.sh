#!/bin/sh

xvfb-run --auto-servernum jest --config=e2e/jest.config.js
