import { readUserSettings } from "../common/readUserSettings";
import { fetchNeighbourhoodStats, fetchNeighbourhoodMeta } from "./api";

import { getProperties, selectDefaultProperties } from "./utils";

chrome.runtime.onInstalled.addListener(selectDefaultProperties);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openOptionsPage") {
    chrome.runtime.openOptionsPage();
    return;
  }

  const { zipCode } = request;

  fetchNeighbourhoodMeta(zipCode).then(async neighbourhoodMeta => {
    if (!neighbourhoodMeta) {
      console.error("Failed to fetch neighbourhood meta for zipCode:", zipCode);
      return;
    }

    const { neighbourhoodCode, neighbourhoodName, municipalityName } = neighbourhoodMeta;

    const neighbourhood = await fetchNeighbourhoodStats(neighbourhoodCode);

    const neighbourhoodWithMeta = {
      neighbourhoodName: { value: neighbourhoodName },
      municipalityName: { value: municipalityName },
      ...neighbourhood,
    };

    const userSettings = await readUserSettings();

    const { badgeProperties, tableProperties } = getProperties(neighbourhoodWithMeta, userSettings);

    sendResponse({ badgeProperties, tableProperties });
  });

  return true;
});
