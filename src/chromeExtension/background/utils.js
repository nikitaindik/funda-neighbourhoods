import { DEFAULT_COLOR, VALUE_FORMATS } from "../common/constants";

import { VIEWABLE_PROPERTIES } from "../common/viewableProperties";

export function selectDefaultProperties({ reason }) {
  if (reason === "install") {
    chrome.storage.sync.set({
      neighbourhoodName: true,
      meanIncomePerResident: true,
    });
  }
}

export function getProperties(neighbourhoodApiResponse, userSettings) {
  const tableProperties = getTableProperties(neighbourhoodApiResponse);

  const badgeProperties = getBadgeProperties(tableProperties, userSettings);

  return {
    badgeProperties,
    tableProperties,
  };
}

function getTableProperties(apiResponseProperties) {
  return VIEWABLE_PROPERTIES.map(viewableProperty => getNeighbourhoodProperty(viewableProperty, apiResponseProperties));
}

function getPropertyValue(propertyConfig, properties) {
  const { name, apiField, valueFormat } = propertyConfig;

  if (typeof valueFormat === "function") {
    return valueFormat(apiField, properties);
  }

  if (valueFormat === VALUE_FORMATS.PERCENTAGE) {
    return properties[apiField].value + "%";
  }

  if (valueFormat === VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE) {
    const residentsCount = properties["AantalInwoners_5"].value;
    const shareOfResidents = properties[apiField].value / residentsCount;
    const integerPercentage = Math.round(shareOfResidents * 100);
    return integerPercentage + "%";
  }

  if (properties[apiField]) {
    return properties[apiField].value;
  }

  return properties[name].value;
}

function getNeighbourhoodProperty(propertyConfig, apiResponseProperties) {
  const { name, apiField, valueFormat, group, getColor } = propertyConfig;

  const label = chrome.i18n.getMessage(name);
  const shortLabel = chrome.i18n.getMessage(name + "Short");

  const year = apiField && apiResponseProperties[apiField].year;

  const value = getPropertyValue(propertyConfig, apiResponseProperties);

  const color = getColor ? getColor(apiField, apiResponseProperties) : DEFAULT_COLOR;

  return {
    name,
    label,
    shortLabel,
    value,
    group,
    color,
    year,
  };
}

function getBadgeProperties(tableProperties, userSettings) {
  return tableProperties.filter(({ name }) => userSettings[name] === true);
}
