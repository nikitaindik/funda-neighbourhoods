const OPTIONS = [
  "neighbourhoodName",
  "meanIncomePerResident",
  "meanIncomePerIncomeRecipient",
  "residentsAge0to14Percentage",
  "residentsAge15to24Percentage",
  "residentsAge25to44Percentage",
  "residentsAge45to64Percentage",
  "residentsAge65AndOlder"
];

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

async function readUserSettings() {
  return new Promise(resolve => {
    chrome.storage.sync.get(OPTIONS, resolve);
  });
}

function handleClicks(event) {
  const clickedElement = event.target;
  const clickedOptionName = clickedElement.dataset.optionName;
  const isOptionClick = clickedOptionName !== undefined;

  if (isOptionClick) {
    chrome.storage.sync.set({ [clickedOptionName]: clickedElement.checked });
  }
}
