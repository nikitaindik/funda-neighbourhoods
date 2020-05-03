import { readUserSettings } from "../common/readUserSettings";
import { fetchNeighbourhood, fetchNeighbourhoodCode } from "./api";

import { getProperties, selectDefaultProperties } from "./utils";

chrome.runtime.onInstalled.addListener(selectDefaultProperties);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openOptionsPage") {
    chrome.runtime.openOptionsPage();
    return;
  }

  const { zipCode } = request;

  fetchNeighbourhoodCode(zipCode).then(async neighbourhoodCodeAndName => {
    if (!neighbourhoodCodeAndName) {
      console.error("Failed to fetch neighbourhood code for zipCode:", zipCode);
      return;
    }

    const { neighbourhoodCode, neighbourhoodName } = neighbourhoodCodeAndName;

    const neighbourhood = await fetchNeighbourhood(neighbourhoodCode);

    if (!neighbourhood) {
      console.error("Failed to fetch neighbourhood code for neighbourhoodCode:", neighbourhoodCode);
      return;
    }

    const neighbourhoodWithName = {
      neighbourhoodName: { value: neighbourhoodName },
      ...neighbourhood,
    };

    const userSettings = await readUserSettings();

    const { badgeProperties, tableProperties } = getProperties(neighbourhoodWithName, userSettings);

    sendResponse({ badgeProperties, tableProperties });
  });

  return true;
});
