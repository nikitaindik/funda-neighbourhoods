import { readUserSettings } from "../common/readUserSettings";
import { VIEWABLE_PROPERTIES } from "../common/viewableProperties";
import { groupProperties } from "../common/utils";

initializePage();

async function initializePage() {
  const userSettings = await readUserSettings();

  const headerHtml = makeHeaderHtml();
  const optionsTableHtml = makeOptionsTableHtml(userSettings);

  document
    .getElementById("header")
    .insertAdjacentHTML("afterbegin", headerHtml);

  document
    .getElementById("options-table")
    .insertAdjacentHTML("afterbegin", optionsTableHtml);

  document.addEventListener("click", handleClicks);
}

function makeHeaderHtml() {
  return `<h3>${chrome.i18n.getMessage("selectBadges")}</h3>`;
}

function makeOptionsTableHtml(userSettings) {
  const groupedProperties = groupProperties(VIEWABLE_PROPERTIES);
  const groupNames = Object.keys(groupedProperties);

  return groupNames
    .map(groupName => {
      const headerHtml = makeSectionHeaderHtml(groupName);

      const group = groupedProperties[groupName];
      const optionsSectionHtml = makeOptionsSectionHtml(group, userSettings);

      return headerHtml + optionsSectionHtml;
    })
    .join("");
}

function makeOptionHtml(optionName, userSettings) {
  const label = chrome.i18n.getMessage(optionName);
  const checked = userSettings[optionName] ? "checked" : "";

  return `
    <div class="options-page-row">
        <div class="options-page-checkbox-container">
        <input
          ${checked}
          id="${optionName}" />
          class="options-page-checkbox"
          type="checkbox"
          data-test="optionsPagePropertyCheckbox-${optionName}"
        </div>
        <div class="options-page-label-container">
          <label
            class="options-page-label"
            for="${optionName}"
            data-test="optionsPagePropertyLabel-${optionName}"
          >
            ${label}
          </label>
        </div>
    </div>
  `;
}

function handleClicks(event) {
  const clickedElement = event.target;
  const clickedOptionName = clickedElement.dataset.optionName;
  const isOptionClick = clickedOptionName !== undefined;

  if (isOptionClick) {
    chrome.storage.sync.set({ [clickedOptionName]: clickedElement.checked });
  }
}

function makeSectionHeaderHtml(groupName) {
  const headerText = chrome.i18n.getMessage(groupName);

  return `
    <div class="options-page-section-header" data-test="optionsPageGroupHeader-${groupName}">
      ${headerText}
    </div>
  `;
}

function makeOptionsSectionHtml(group, userSettings) {
  return group
    .map(option => makeOptionHtml(option.name, userSettings))
    .join("");
}
