const addApiPathToManifest = zipCodeApiPath => manifestContent => {
  const manifest = JSON.parse(manifestContent);

  const updatedManifest = {
    ...manifest,
    permissions: [...manifest.permissions, zipCodeApiPath + "/"]
  };

  return JSON.stringify(updatedManifest, null, 2);
};

module.exports = addApiPathToManifest;
