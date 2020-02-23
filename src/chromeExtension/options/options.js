const { readUserSettings } = require("../common/readUserSettings");
const { OPTIONS } = require("../common/constants");

initializePage();

async function initializePage() {
  const userSettings = await readUserSettings();

  const optionsTableHtml = makeOptionsTableHtml(userSettings);

  document.body.insertAdjacentHTML("afterbegin", optionsTableHtml);

  document.addEventListener("click", handleClicks);
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
        <div>
            <span>${label}</span>
            <input type="checkbox" ${checked} data-option-name="${optionName}" />
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
