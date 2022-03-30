import { INCOME_BAND_COLORS, VALUE_FORMATS } from "./constants";
import { getIncomeBand, formatIncomeValue, formatMoney } from "./utils";
import { findApiResponsePropertyName } from "../common/utils";

export const VIEWABLE_PROPERTIES = [
  {
    name: "neighbourhoodName",
    group: "doNotShowInTable",
  },
  {
    name: "municipalityName",
    group: "doNotShowInTable",
  },
  {
    name: "builtBefore2000",
    group: "yearBuilt",
    apiField: "BouwjaarVoor2000",
    valueFormat: VALUE_FORMATS.PERCENTAGE,
  },
  {
    name: "builtAfter2000",
    group: "yearBuilt",
    apiField: "BouwjaarVanaf2000",
    valueFormat: VALUE_FORMATS.PERCENTAGE,
  },
  {
    name: "meanIncomePerResident",
    group: "income",
    apiField: "GemiddeldInkomenPerInwoner",
    valueFormat: (apiField, properties) => {
      const income = Number((properties[apiField].value * 1000).toFixed(0));
      const incomeBand = getIncomeBand(income);

      return formatIncomeValue(income, incomeBand);
    },
    getColor: (apiResponsePropertyName, properties) => {
      const income = properties[apiResponsePropertyName].value * 1000;
      const incomeBand = getIncomeBand(income);

      return INCOME_BAND_COLORS[incomeBand];
    },
  },
  {
    name: "meanIncomePerIncomeRecipient",
    group: "income",
    apiField: "GemiddeldInkomenPerInkomensontvanger",
    valueFormat: (apiField, properties) => {
      const income = Number((properties[apiField].value * 1000).toFixed(0));
      return formatMoney(income);
    },
  },
  {
    name: "veryHighIncomeHouseholds",
    group: "income",
    apiField: "k_20HuishoudensMetHoogsteInkomen",
    valueFormat: VALUE_FORMATS.PERCENTAGE,
  },
  {
    name: "lowIncomeHouseholds",
    group: "income",
    apiField: "HuishoudensMetEenLaagInkomen",
    valueFormat: VALUE_FORMATS.PERCENTAGE,
  },
  {
    name: "veryLowIncomeHouseholds",
    group: "income",
    apiField: "k_40HuishoudensMetLaagsteInkomen",
    valueFormat: VALUE_FORMATS.PERCENTAGE,
  },
  {
    name: "belowSocialMinimumHouseholds",
    group: "income",
    apiField: "HuishOnderOfRondSociaalMinimum",
    valueFormat: VALUE_FORMATS.PERCENTAGE,
  },
  {
    name: "residentsAge0to14Percentage",
    group: "residentsAge",
    apiField: "k_0Tot15Jaar",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "residentsAge15to24Percentage",
    group: "residentsAge",
    apiField: "k_15Tot25Jaar",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "residentsAge25to44Percentage",
    group: "residentsAge",
    apiField: "k_25Tot45Jaar",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "residentsAge45to64Percentage",
    group: "residentsAge",
    apiField: "k_45Tot65Jaar",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "residentsAge65AndOlder",
    group: "residentsAge",
    apiField: "k_65JaarOfOuder",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "nonMarried",
    group: "residentsMaritalStatus",
    apiField: "Ongehuwd",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "married",
    group: "residentsMaritalStatus",
    apiField: "Gehuwd",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "divorced",
    group: "residentsMaritalStatus",
    apiField: "Gescheiden",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "widowed",
    group: "residentsMaritalStatus",
    apiField: "Verweduwd",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "singlePersonHouseholds",
    group: "householdType",
    apiField: "Eenpersoonshuishoudens",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "householdsWithChildren",
    group: "householdType",
    apiField: "HuishoudensMetKinderen",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "householdsWithoutChildren",
    group: "householdType",
    apiField: "HuishoudensZonderKinderen",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "rentalProperties",
    group: "propertyOwnership",
    apiField: "HuurwoningenTotaal",
    valueFormat: VALUE_FORMATS.PERCENTAGE,
  },
  {
    name: "ownedProperties",
    group: "propertyOwnership",
    apiField: "Koopwoningen",
    valueFormat: VALUE_FORMATS.PERCENTAGE,
  },
  {
    name: "singleFamilyResidential",
    group: "buildingType",
    apiField: "PercentageEengezinswoning",
    valueFormat: VALUE_FORMATS.PERCENTAGE,
  },
  {
    name: "multiFamilyResidential",
    group: "buildingType",
    apiField: "PercentageMeergezinswoning",
    valueFormat: VALUE_FORMATS.PERCENTAGE,
  },
  {
    name: "westernImmigrants",
    group: "immigrationBackground",
    apiField: "WestersTotaal",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "nonWesternImmigrants",
    group: "immigrationBackground",
    apiField: "NietWestersTotaal",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "residentsFromMorocco",
    group: "immigrationBackground",
    apiField: "Marokko",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "residentsFromAntillesOrAruba",
    group: "immigrationBackground",
    apiField: "NederlandseAntillenEnAruba",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "residentsFromSuriname",
    group: "immigrationBackground",
    apiField: "Suriname",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "residentsFromTurkey",
    group: "immigrationBackground",
    apiField: "Turkije",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "residentsOfOtherNonWesternBackground",
    group: "immigrationBackground",
    apiField: "OverigNietWesters",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "nonImmigrants",
    group: "immigrationBackground",
    valueFormat: (apiField, properties) => {
      const residentsCount = properties[findApiResponsePropertyName(properties, "AantalInwoners")].value;
      const westernImmigrantsCount = properties[findApiResponsePropertyName(properties, "WestersTotaal")].value;
      const nonWesternImmigrantsCount = properties[findApiResponsePropertyName(properties, "NietWestersTotaal")].value;
      const totalImmigrantsCount = westernImmigrantsCount + nonWesternImmigrantsCount;
      const shareOfImmigrants = totalImmigrantsCount / residentsCount;
      const shareOfNonImmigrants = 1 - shareOfImmigrants;
      const integerPercentage = Math.round(shareOfNonImmigrants * 100);
      return integerPercentage + "%";
    },
  },
];
