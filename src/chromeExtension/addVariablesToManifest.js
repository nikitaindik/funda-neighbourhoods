const path = require("path");
const packageJson = require("../../package.json");
const { dummyHousePageUrl, dummySoldHousePageUrl } = require("../../tests/utils.js");

const addVariablesToManifest = (zipCodeApiDomain, isTestMode) => manifestContent => {
  const manifest = JSON.parse(manifestContent);

  manifest.version = packageJson.version;

  manifest.permissions.push(zipCodeApiDomain + "/");

  if (isTestMode) {
    // Add permission to run extension on a dummy house pages
    manifest.content_scripts[0].matches.push(dummyHousePageUrl, dummySoldHousePageUrl);
  }

  return JSON.stringify(manifest, null, 2);
};

module.exports = addVariablesToManifest;
