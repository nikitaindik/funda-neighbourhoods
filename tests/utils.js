const path = require("path");

const dummyHousePageUrl = `file://${path.resolve(__dirname, "./dummyHousePage.html")}`;
const dummySoldHousePageUrl = `file://${path.resolve(__dirname, "./dummySoldHousePage.html")}`;

async function getExtensionBackgroundPage(browser) {
  const targets = await browser.targets();
  const backgroundPageTarget = targets.find(target => target.type() === "background_page");
  const backgroundPage = await backgroundPageTarget.page();

  return backgroundPage;
}

module.exports = {
  dummyHousePageUrl,
  dummySoldHousePageUrl,
  getExtensionBackgroundPage,
};
