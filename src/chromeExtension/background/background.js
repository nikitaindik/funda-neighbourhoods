const { getSphericalMercator, getTableData } = require("./utils");
const { fetchCoordinates, fetchNeighbourhood } = require("./api");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { zipCode } = request;

  fetchCoordinates(zipCode).then(async coordinates => {
    const sphericalMercator = getSphericalMercator(coordinates);

    const neighbourhoodApiResponse = await fetchNeighbourhood(
      sphericalMercator
    );

    const tableData = getTableData(neighbourhoodApiResponse);

    sendResponse({ tableData });
  });

  return true;
});
