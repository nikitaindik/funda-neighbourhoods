import { INCOME_BAND_COLORS } from "./constants";
import { getIncomeBand, formatIncomeValue, formatMoney } from "./utils";

export const VIEWABLE_PROPERTIES = [
  {
    name: "neighbourhoodName",
    group: "doNotShowInTable",
    getValue: properties => properties.buurtnaam
  },
  {
    name: "builtBefore2000",
    group: "yearBuilt",
    getValue: properties => `${properties.percentage_bouwjaarklasse_tot_2000}%`
  },
  {
    name: "builtAfter2000",
    group: "yearBuilt",
    getValue: properties =>
      `${properties.percentage_bouwjaarklasse_vanaf_2000}%`
  },
  {
    name: "meanIncomePerResident",
    group: "income",
    getValue: properties => {
      const income = properties.gemiddeld_inkomen_per_inwoner * 1000;
      const incomeBand = getIncomeBand(income);

      return formatIncomeValue(income, incomeBand);
    },
    getColor: properties => {
      const income = properties.gemiddeld_inkomen_per_inwoner * 1000;
      const incomeBand = getIncomeBand(income);

      return INCOME_BAND_COLORS[incomeBand];
    }
  },
  {
    name: "meanIncomePerIncomeRecipient",
    group: "income",
    getValue: properties => {
      const income = properties.gemiddeld_inkomen_per_inkomensontvanger * 1000;
      return formatMoney(income);
    }
  },
  {
    name: "veryHighIncomeHouseholds",
    group: "income",
    getValue: properties =>
      `${properties.percentage_huishoudens_met_hoogste_inkomen}%`
  },
  {
    name: "lowIncomeHouseholds",
    group: "income",
    getValue: properties => {
      const apiValue = properties.percentage_huishoudens_met_een_laag_inkomen;
      return apiValue ? `${apiValue}%` : "-";
    }
  },
  {
    name: "veryLowIncomeHouseholds",
    group: "income",
    getValue: properties =>
      `${properties.percentage_huishoudens_met_laagste_inkomen}%`
  },
  {
    name: "belowSocialMinimumHouseholds",
    group: "income",
    getValue: properties =>
      `${properties.percentage_huishoudens_onder_of_rond_sociaal_minimum}%`
  },
  {
    name: "residentsAge0to14Percentage",
    group: "residentsAge",
    getValue: properties => `${properties.percentage_personen_0_tot_15_jaar}%`
  },
  {
    name: "residentsAge15to24Percentage",
    group: "residentsAge",
    getValue: properties => `${properties.percentage_personen_15_tot_25_jaar}%`
  },
  {
    name: "residentsAge25to44Percentage",
    group: "residentsAge",
    getValue: properties => `${properties.percentage_personen_25_tot_45_jaar}%`
  },
  {
    name: "residentsAge45to64Percentage",
    group: "residentsAge",
    getValue: properties => `${properties.percentage_personen_45_tot_65_jaar}%`
  },
  {
    name: "residentsAge65AndOlder",
    group: "residentsAge",
    getValue: properties =>
      `${properties.percentage_personen_65_jaar_en_ouder}%`
  },
  {
    name: "nonMarried",
    group: "residentsMaritalStatus",
    getValue: properties => `${properties.percentage_ongehuwd}%`
  },
  {
    name: "married",
    group: "residentsMaritalStatus",
    getValue: properties => `${properties.percentage_gehuwd}%`
  },
  {
    name: "divorced",
    group: "residentsMaritalStatus",
    getValue: properties => `${properties.percentage_gescheid}%`
  },
  {
    name: "widowed",
    group: "residentsMaritalStatus",
    getValue: properties => `${properties.percentage_verweduwd}%`
  },
  {
    name: "singlePersonHouseholds",
    group: "householdType",
    getValue: properties => `${properties.percentage_eenpersoonshuishoudens}%`
  },
  {
    name: "householdsWithChildren",
    group: "householdType",
    getValue: properties => `${properties.percentage_huishoudens_met_kinderen}%`
  },
  {
    name: "householdsWithoutChildren",
    group: "householdType",
    getValue: properties =>
      `${properties.percentage_huishoudens_zonder_kinderen}%`
  },
  {
    name: "rentalProperties",
    group: "propertyOwnership",
    getValue: properties => `${properties.percentage_huurwoningen}%`
  },
  {
    name: "ownedProperties",
    group: "propertyOwnership",
    getValue: properties => `${properties.percentage_koopwoningen}%`
  },
  {
    name: "multiFamilyResidential",
    group: "buildingType",
    getValue: properties => `${properties.percentage_meergezinswoning}%`
  },
  {
    name: "westernImmigrants",
    group: "immigrationBackground",
    getValue: properties => `${properties.percentage_westerse_allochtonen}%`
  },
  {
    name: "nonWesternImmigrants",
    group: "immigrationBackground",
    getValue: properties =>
      `${properties.percentage_niet_westerse_allochtonen}%`
  },
  {
    name: "residentsFromMorocco",
    group: "immigrationBackground",
    getValue: properties => `${properties.percentage_uit_marokko}%`
  },
  {
    name: "residentsFromAntillesOrAruba",
    group: "immigrationBackground",
    getValue: properties =>
      `${properties.percentage_uit_nederlandse_antillen_en_aruba}%`
  },
  {
    name: "residentsFromSuriname",
    group: "immigrationBackground",
    getValue: properties => `${properties.percentage_uit_suriname}%`
  },
  {
    name: "residentsFromTurkey",
    group: "immigrationBackground",
    getValue: properties => `${properties.percentage_uit_turkije}%`
  },
  {
    name: "residentsOfOtherNonWesternBackground",
    group: "immigrationBackground",
    getValue: properties =>
      `${properties.percentage_overige_niet_westerse_allochtonen}%`
  }
];
