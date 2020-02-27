import { DEFAULT_COLOR } from "../common/constants";

import { VIEWABLE_PROPERTIES } from "../common/viewableProperties";

export function selectDefaultProperties({ reason }) {
  if (reason === "install") {
    chrome.storage.sync.set({
      neighbourhoodName: true,
      meanIncomePerResident: true
    });
  }
}

export function getSphericalMercatorCoordinates(latitudeLongitude) {
  const R = 6378137;
  const MAX_LATITUDE = 85.0511287798;

  const d = Math.PI / 180;
  const max = MAX_LATITUDE;
  const lat = Math.max(Math.min(max, latitudeLongitude.lat), -max);
  const sin = Math.sin(lat * d);

  return [
    R * latitudeLongitude.lng * d,
    (R * Math.log((1 + sin) / (1 - sin))) / 2
  ];
}

export function getProperties(neighbourhoodApiResponse, userSettings) {
  const apiResponseProperties = neighbourhoodApiResponse.features[0].properties;

  const tableProperties = getTableProperties(apiResponseProperties);

  const badgeProperties = getBadgeProperties(tableProperties, userSettings);

  return {
    badgeProperties,
    tableProperties
  };
}

function getTableProperties(apiResponseProperties) {
  return VIEWABLE_PROPERTIES.map(viewableProperty =>
    getNeighbourhoodProperty(viewableProperty, apiResponseProperties)
  );
}

function getNeighbourhoodProperty(viewableProperty, apiResponseProperties) {
  const name = viewableProperty.name;
  const label = chrome.i18n.getMessage(name);
  const shortLabel = chrome.i18n.getMessage(name + "Short");
  const value = viewableProperty.getValue(apiResponseProperties);
  const group = viewableProperty.group;
  const color = viewableProperty.getColor
    ? viewableProperty.getColor(apiResponseProperties)
    : DEFAULT_COLOR;

  return {
    name,
    label,
    shortLabel,
    value,
    group,
    color
  };
}

function getBadgeProperties(tableProperties, userSettings) {
  return tableProperties.filter(({ name }) => userSettings[name] === true);
}
