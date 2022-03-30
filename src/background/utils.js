import { DEFAULT_COLOR, VALUE_FORMATS } from "../common/constants";
import { VIEWABLE_PROPERTIES } from "../common/viewableProperties";
import { findApiResponsePropertyName } from "../common/utils";

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
  const nonApiProperties = VIEWABLE_PROPERTIES.filter(({ group }) => group === "doNotShowInTable");

  const apiProperties = VIEWABLE_PROPERTIES.filter(viewableProperty => {
    // Use only properties that exist in response
    const apiResponsePropertyName = findApiResponsePropertyName(apiResponseProperties, viewableProperty.apiField);
    return apiResponsePropertyName;
  });

  const nonImmigrants = VIEWABLE_PROPERTIES.filter(({ name }) => name === "nonImmigrants");

  return [...nonApiProperties, ...apiProperties, ...nonImmigrants].map(viewableProperty =>
    getNeighbourhoodProperty(viewableProperty, apiResponseProperties)
  );
}

function getPropertyValue(propertyConfig, apiResponsePropertyName, properties) {
  const { name, apiField, valueFormat } = propertyConfig;

  if (typeof valueFormat === "function") {
    return valueFormat(apiResponsePropertyName, properties);
  }

  if (valueFormat === VALUE_FORMATS.PERCENTAGE) {
    return properties[apiResponsePropertyName].value + "%";
  }

  if (valueFormat === VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE) {
    const residentsCount = properties[findApiResponsePropertyName(properties, "AantalInwoners")].value;
    const shareOfResidents = properties[apiResponsePropertyName].value / residentsCount;
    const integerPercentage = Math.round(shareOfResidents * 100);
    return integerPercentage + "%";
  }

  if (properties[apiResponsePropertyName]) {
    return properties[apiResponsePropertyName].value;
  }

  return properties[name].value;
}

function getNeighbourhoodProperty(propertyConfig, apiResponseProperties) {
  const { name, apiField, valueFormat, group, getColor } = propertyConfig;

  const label = chrome.i18n.getMessage(name);
  const shortLabel = chrome.i18n.getMessage(name + "Short");

  const apiResponsePropertyName = findApiResponsePropertyName(apiResponseProperties, apiField);
  const year = apiField && apiResponseProperties[apiResponsePropertyName].year;

  const value = getPropertyValue(propertyConfig, apiResponsePropertyName, apiResponseProperties);

  const color = getColor ? getColor(apiResponsePropertyName, apiResponseProperties) : DEFAULT_COLOR;

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
