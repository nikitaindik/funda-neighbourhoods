const { OPTIONS } = require("../common/constants");

async function readUserSettings() {
  return new Promise(resolve => {
    chrome.storage.sync.get(OPTIONS, resolve);
  });
}

module.exports = {
  readUserSettings
};
