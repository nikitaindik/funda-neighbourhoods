const packageJson = require("../../package.json");

const addVariablesToManifest = zipCodeApiPath => manifestContent => {
  const manifest = JSON.parse(manifestContent);

  const updatedManifest = {
    ...manifest,
    permissions: [...manifest.permissions, zipCodeApiPath + "/"],
    version: packageJson.version
  };

  return JSON.stringify(updatedManifest, null, 2);
};

module.exports = addVariablesToManifest;
