import { INCOME_BANDS } from "./constants";

export function getIncomeBand(income) {
  if (!income) {
    return INCOME_BANDS.noInfo;
  }

  if (income >= 30000) {
    return INCOME_BANDS.veryHigh;
  }

  if (income >= 25000) {
    return INCOME_BANDS.high;
  }

  if (income >= 21000) {
    return INCOME_BANDS.average;
  }

  if (income >= 19000) {
    return INCOME_BANDS.belowAverage;
  }

  if (income >= 17000) {
    return INCOME_BANDS.low;
  }

  if (income >= 15000) {
    return INCOME_BANDS.veryLow;
  }

  return INCOME_BANDS.extremelyLow;
}

export function formatMoney(moneyValue) {
  const incomeString = String(moneyValue);
  const incomeWithComma = `${incomeString.slice(0, -3)},${incomeString.slice(
    -3
  )}`;

  return `€${incomeWithComma}`;
}

export function formatIncomeValue(income, incomeBand) {
  const money = formatMoney(income);
  const incomeBandTitle = chrome.i18n.getMessage(incomeBand);

  return `${money} (${incomeBandTitle})`;
}

export function groupProperties(properties) {
  return properties.reduce((grouped, property) => {
    const groupName = property.group || "noGroup";

    if (grouped.hasOwnProperty(groupName)) {
      grouped[groupName].push(property);
    } else {
      grouped[groupName] = [property];
    }

    return grouped;
  }, {});
}
