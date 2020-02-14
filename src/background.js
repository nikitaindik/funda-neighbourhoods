const COORDINATES_BY_ZIPCODE = require("./zipCodes/nlZipCodesUpTo3000.json");
const { getSphericalMercator } = require("./utils");
const { fetchNeighbourhood } = require("./api");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { zipCode } = request;

  const coordinates = COORDINATES_BY_ZIPCODE[zipCode];
  const sphericalMercator = getSphericalMercator(coordinates);

  fetchNeighbourhood(sphericalMercator).then(neighbourhood => {
    const income =
      neighbourhood.features[0].properties.gemiddeld_inkomen_per_inwoner * 1000;

    sendResponse({ income });
  });

  return true;
});
