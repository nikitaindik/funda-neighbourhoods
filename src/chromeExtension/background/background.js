const { readUserSettings } = require("../common/readUserSettings");

const { getSphericalMercator, getProperties } = require("./utils");
const { fetchCoordinates, fetchNeighbourhood } = require("./api");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openOptionsPage") {
    chrome.runtime.openOptionsPage();
    return;
  }

  const { zipCode } = request;

  fetchCoordinates(zipCode).then(async coordinates => {
    const sphericalMercator = getSphericalMercator(coordinates);

    const neighbourhoodApiResponse = await fetchNeighbourhood(
      sphericalMercator
    );

    const userSettings = await readUserSettings();

    const { badgeProperties, tableProperties } = getProperties(
      neighbourhoodApiResponse,
      userSettings
    );

    sendResponse({ badgeProperties, tableProperties });
  });

  return true;
});
