const { readUserSettings } = require("../common/readUserSettings");
const { OPTIONS } = require("../common/constants");

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
  return OPTIONS.map(optionName =>
    makeOptionHtml(optionName, userSettings)
  ).join("");
}

function makeOptionHtml(optionName, userSettings) {
  const label = chrome.i18n.getMessage(optionName);
  const checked = userSettings[optionName] ? "checked" : "";

  return `
    <div class="table-row">
        <div class="table-checkbox-container">
          <input class="table-checkbox" type="checkbox" ${checked} data-option-name="${optionName}" id="${optionName}" />
        </div>
        <div class="table-label-container">
          <label class="table-label" for="${optionName}">${label}</label>
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
