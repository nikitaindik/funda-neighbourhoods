const path = require("path");
const packageJson = require("../../package.json");

const addVariablesToManifest = (
  zipCodeApiPath,
  isTestMode
) => manifestContent => {
  const manifest = JSON.parse(manifestContent);

  manifest.version = packageJson.version;

  manifest.permissions.push(zipCodeApiPath + "/");

  if (isTestMode) {
    // Add permission to run extension on a dummy house page
    const dummyPagePath = path.resolve(
      __dirname,
      "../../tests/dummyHousePage.html"
    );
    const dummyPageUrl = `file://${dummyPagePath}`;
    manifest.content_scripts[0].matches.push(dummyPageUrl);
  }

  console.log(manifest.content_scripts[0]);

  return JSON.stringify(manifest, null, 2);
};

module.exports = addVariablesToManifest;
