import { INCOME_BANDS, INCOME_BAND_COLORS, DEFAULT_COLOR } from "./constants";

export function getSphericalMercator(coordinates) {
  const R = 6378137;
  const MAX_LATITUDE = 85.0511287798;

  const d = Math.PI / 180;
  const max = MAX_LATITUDE;
  const lat = Math.max(Math.min(max, coordinates.lat), -max);
  const sin = Math.sin(lat * d);

  return [R * coordinates.lng * d, (R * Math.log((1 + sin) / (1 - sin))) / 2];
}

export function getProperties(neighbourhoodApiResponse, userSettings) {
  const properties = neighbourhoodApiResponse.features[0].properties;

  const neighbourhoodName = getNeighbourhoodProperty(
    "neighbourhoodName",
    properties.buurtnaam
  );

  const income = properties.gemiddeld_inkomen_per_inwoner * 1000;
  const incomeBand = getIncomeBand(income);
  const meanIncomePerResident = getNeighbourhoodProperty(
    "meanIncomePerResident",
    formatIncomeValue(income, incomeBand),
    INCOME_BAND_COLORS[incomeBand]
  );

  const meanIncomePerIncomeRecipient = getNeighbourhoodProperty(
    "meanIncomePerIncomeRecipient",
    formatMoney(properties.gemiddeld_inkomen_per_inkomensontvanger * 1000)
  );

  const residentsAge0to14Percentage = getNeighbourhoodProperty(
    "residentsAge0to14Percentage",
    `${properties.percentage_personen_0_tot_15_jaar}%`
  );

  const residentsAge15to24Percentage = getNeighbourhoodProperty(
    "residentsAge15to24Percentage",
    `${properties.percentage_personen_15_tot_25_jaar}%`
  );

  const residentsAge25to44Percentage = getNeighbourhoodProperty(
    "residentsAge25to44Percentage",
    `${properties.percentage_personen_25_tot_45_jaar}%`
  );

  const residentsAge45to64Percentage = getNeighbourhoodProperty(
    "residentsAge45to64Percentage",
    `${properties.percentage_personen_45_tot_65_jaar}%`
  );

  const residentsAge65AndOlder = getNeighbourhoodProperty(
    "residentsAge45to64Percentage",
    `${properties.percentage_personen_65_jaar_en_ouder}%`
  );

  const tableProperties = {
    neighbourhoodName,
    meanIncomePerResident,
    meanIncomePerIncomeRecipient,
    residentsAge0to14Percentage,
    residentsAge15to24Percentage,
    residentsAge25to44Percentage,
    residentsAge45to64Percentage,
    residentsAge65AndOlder
  };

  const badgeProperties = getBadgeProperties(tableProperties, userSettings);

  /*

percentage_uit_nederlandse_antillen_en_aruba: 1
percentage_bewoond: 93
percentage_eenpersoonshuishoudens: 60
geboortes_per_1000_inwoners: 8
percentage_gehuwd: 30
percentage_gescheid: 10
percentage_huishoudens_met_kinderen: 17
percentage_huishoudens_zonder_kinderen: 22
percentage_huishoudens_met_hoogste_inkomen: 18
percentage_personen_met_hoog_inkomen: 28
percentage_woningen_met_eigendom_onbekend: 0
perc_huurwoningen_in_bezit_woningcorporaties: 31
perc_huurwoningen_in_bezit_overige_verhuurders: 35
percentage_huurwoningen: 66
percentage_koopwoningen: 34
percentage_huishoudens_met_laagste_inkomen: 47
percentage_personen_met_laag_inkomen: 35
percentage_leegstand_woningen: 7
percentage_huishoudens_met_een_laag_inkomen: null
percentage_uit_marokko: 2
percentage_meergezinswoning: 92
percentage_niet_westerse_allochtonen: 21
percentage_ongehuwd: 50
percentage_overige_niet_westerse_allochtonen: 13
percentage_huishoudens_onder_of_rond_sociaal_minimum: 10
aandeel_stadsverwarming: -99999999
sterfte_relatief: 29
percentage_uit_suriname: 3
percentage_uit_turkije: 2
percentage_verweduwd: 10
percentage_westerse_allochtonen: 25
percentage_bouwjaarklasse_tot_2000: 96
percentage_bouwjaarklasse_vanaf_2000: 4
meest_voorkomende_postcode: "1083"
stedelijkheid_adressen_per_km2: 1
sterfte_totaal: 225
water: "NEE"
wijkcode: "WK036304"
woningvoorraad: 4321
gemiddelde_woningwaarde: 203
aantal_personen_met_een_ww_uitkering_totaal: 130
aantal_personen_met_een_algemene_bijstandsuitkering_totaal: 190

  */

  return {
    badgeProperties,
    tableProperties
  };
}

function getNeighbourhoodProperty(i18nKey, value, color) {
  return {
    label: chrome.i18n.getMessage(i18nKey),
    shortLabel: chrome.i18n.getMessage(i18nKey + "Short"),
    value,
    color: color || DEFAULT_COLOR
  };
}

function getBadgeProperties(tableProperties, userSettings) {
  const badgeNames = Object.keys(tableProperties).filter(
    propertyName => userSettings[propertyName] === true
  );

  const badgeEntries = Object.entries(tableProperties).filter(property =>
    badgeNames.includes(property[0])
  );

  return Object.fromEntries(badgeEntries);
}

function formatMoney(moneyValue) {
  const incomeString = String(moneyValue);
  const incomeWithComma = `${incomeString.slice(0, -3)},${incomeString.slice(
    -3
  )}`;

  return `€${incomeWithComma}`;
}

function formatIncomeValue(income, incomeBand) {
  const money = formatMoney(income);
  const incomeBandTitle = chrome.i18n.getMessage(incomeBand);

  return `${money} (${incomeBandTitle})`;
}

function getIncomeBand(income) {
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
