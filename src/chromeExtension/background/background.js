import { readUserSettings } from "../common/readUserSettings";

import { getSphericalMercatorCoordinates, getProperties } from "./utils";
import { fetchLatitudeLongitude, fetchNeighbourhood } from "./api";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openOptionsPage") {
    chrome.runtime.openOptionsPage();
    return;
  }

  const { zipCode } = request;

  fetchLatitudeLongitude(zipCode).then(async latitudeLongitude => {
    const sphericalMercator = getSphericalMercatorCoordinates(
      latitudeLongitude
    );

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
