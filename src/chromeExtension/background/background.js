const { getSphericalMercator } = require("./utils");
const { fetchCoordinates, fetchNeighbourhood } = require("./api");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { zipCode } = request;

  fetchCoordinates(zipCode).then(async coordinates => {
    const sphericalMercator = getSphericalMercator(coordinates);

    const neighbourhood = await fetchNeighbourhood(sphericalMercator);

    const income =
      neighbourhood.features[0].properties.gemiddeld_inkomen_per_inwoner * 1000;

    sendResponse({ income });
  });

  return true;
});
