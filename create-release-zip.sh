#!/bin/bash

PACKAGE_VERSION=$(grep version package.json | cut -d':' -f2 | cut -d'"' -f2)

zip -r funda-neighbourhoods-v$PACKAGE_VERSION.zip build