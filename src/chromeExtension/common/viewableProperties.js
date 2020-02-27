import { INCOME_BAND_COLORS } from "./constants";
import { getIncomeBand, formatIncomeValue, formatMoney } from "./utils";

export const VIEWABLE_PROPERTIES = [
  {
    name: "neighbourhoodName",
    getValue: properties => properties.buurtnaam
  },
  {
    name: "builtBefore2000",
    getValue: properties => `${properties.percentage_bouwjaarklasse_tot_2000}%`
  },
  {
    name: "builtAfter2000",
    getValue: properties =>
      `${properties.percentage_bouwjaarklasse_vanaf_2000}%`
  },
  {
    name: "meanIncomePerResident",
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
    getValue: properties => {
      const income = properties.gemiddeld_inkomen_per_inkomensontvanger * 1000;
      return formatMoney(income);
    }
  },
  {
    name: "veryHighIncomeHouseholds",
    getValue: properties =>
      `${properties.percentage_huishoudens_met_hoogste_inkomen}%`
  },
  {
    name: "lowIncomeHouseholds",
    getValue: properties => {
      const apiValue = properties.percentage_huishoudens_met_een_laag_inkomen;
      return apiValue ? `${apiValue}%` : "-";
    }
  },
  {
    name: "veryLowIncomeHouseholds",
    getValue: properties =>
      `${properties.percentage_huishoudens_met_laagste_inkomen}%`
  },
  {
    name: "belowSocialMinimumHouseholds",
    getValue: properties =>
      `${properties.percentage_huishoudens_onder_of_rond_sociaal_minimum}%`
  },
  {
    name: "residentsAge0to14Percentage",
    getValue: properties => `${properties.percentage_personen_0_tot_15_jaar}%`
  },
  {
    name: "residentsAge15to24Percentage",
    getValue: properties => `${properties.percentage_personen_15_tot_25_jaar}%`
  },
  {
    name: "residentsAge25to44Percentage",
    getValue: properties => `${properties.percentage_personen_25_tot_45_jaar}%`
  },
  {
    name: "residentsAge45to64Percentage",
    getValue: properties => `${properties.percentage_personen_45_tot_65_jaar}%`
  },
  {
    name: "residentsAge65AndOlder",
    getValue: properties =>
      `${properties.percentage_personen_65_jaar_en_ouder}%`
  },
  {
    name: "singlePersonHouseholds",
    getValue: properties => `${properties.percentage_eenpersoonshuishoudens}%`
  },
  {
    name: "householdsWithChildren",
    getValue: properties => `${properties.percentage_huishoudens_met_kinderen}%`
  },
  {
    name: "householdsWithoutChildren",
    getValue: properties =>
      `${properties.percentage_huishoudens_zonder_kinderen}%`
  },
  {
    name: "nonMarried",
    getValue: properties => `${properties.percentage_ongehuwd}%`
  },
  {
    name: "married",
    getValue: properties => `${properties.percentage_gehuwd}%`
  },
  {
    name: "divorced",
    getValue: properties => `${properties.percentage_gescheid}%`
  },
  {
    name: "widowed",
    getValue: properties => `${properties.percentage_verweduwd}%`
  },
  {
    name: "rentalProperties",
    getValue: properties => `${properties.percentage_huurwoningen}%`
  },
  {
    name: "ownedlProperties",
    getValue: properties => `${properties.percentage_koopwoningen}%`
  },
  {
    name: "multiFamilyResidential",
    getValue: properties => `${properties.percentage_meergezinswoning}%`
  },
  {
    name: "westernImmigrants",
    getValue: properties => `${properties.percentage_westerse_allochtonen}%`
  },
  {
    name: "nonWesternImmigrants",
    getValue: properties =>
      `${properties.percentage_niet_westerse_allochtonen}%`
  },
  {
    name: "residentsFromMorocco",
    getValue: properties => `${properties.percentage_uit_marokko}%`
  },
  {
    name: "residentsFromAntillesOrAruba",
    getValue: properties =>
      `${properties.percentage_uit_nederlandse_antillen_en_aruba}%`
  },
  {
    name: "residentsFromSuriname",
    getValue: properties => `${properties.percentage_uit_suriname}%`
  },
  {
    name: "residentsFromTurkey",
    getValue: properties => `${properties.percentage_uit_turkije}%`
  },
  {
    name: "residentsOfOtherNonWesternBackground",
    getValue: properties =>
      `${properties.percentage_overige_niet_westerse_allochtonen}%`
  }
];
