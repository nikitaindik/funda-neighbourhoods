const zipCode = getZipCode();

chrome.runtime.sendMessage({ zipCode }, response => {
  const { income } = response;
  addIncomeLabel(income);
});

function getZipCode() {
  const zipCodeElement = document.querySelector(".object-header__subtitle");
  const elementText = zipCodeElement.innerText;
  const zipCodeRe = /\d\d\d\d\s*[A-Z][A-Z]/;
  const match = elementText.match(zipCodeRe);

  return match[0].replace(" ", "");
}

function getLabelsContainerElement() {
  let labelsContainerElement = document.querySelector(
    ".object-header__details-info .labels"
  );

  if (!labelsContainerElement) {
    labelsContainerElement = document.createElement("ul");
    labelsContainerElement.classList.add("labels");
    document
      .querySelector(".object-header__details-info")
      .appendChild(labelsContainerElement);
  }

  return labelsContainerElement;
}

function addIncomeLabel(income) {
  const { labelText, color } = getIncomeLabel(income);

  const labelsContainerElement = getLabelsContainerElement();
  const style = `margin-left: 16px; background: ${color};`;

  labelsContainerElement.innerHTML += `<li class="label-nieuw" style="${style}" title="${income}">${labelText}</li>`;
}

function getIncomeLabel(income) {
  const colors = {
    noInfo: "#c0c0c0",
    hobos: "#4575b5",
    veryPoor: "#849eba",
    poor: "#c1ccbe",
    okay: "#fdd835",
    normies: "#fab681",
    wellOff: "#ed7550",
    rich: "#d62f28"
  };

  if (!income) {
    return {
      color: colors.noInfo,
      labelText: "No Info"
    };
  }

  if (income < 15000) {
    return {
      color: colors.hobos,
      labelText: "Hobos"
    };
  }

  if (income >= 15000 && income < 17000) {
    return {
      color: colors.veryPoor,
      labelText: "Very Poor"
    };
  }

  if (income >= 17000 && income < 19000) {
    return {
      color: colors.poor,
      labelText: "Poor"
    };
  }

  if (income >= 19000 && income < 21000) {
    return {
      color: colors.okay,
      labelText: "Okay"
    };
  }

  if (income >= 21000 && income < 25000) {
    return {
      color: colors.normies,
      labelText: "Normies"
    };
  }

  if (income >= 25000 && income < 30000) {
    return {
      color: colors.wellOff,
      labelText: "Well-off"
    };
  }

  if (income >= 30000) {
    return {
      color: colors.rich,
      labelText: "Rich"
    };
  }
}
