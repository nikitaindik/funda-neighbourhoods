import { INCOME_BAND_COLORS, VALUE_FORMATS } from "./constants";
import { getIncomeBand, formatIncomeValue, formatMoney } from "./utils";

export const VIEWABLE_PROPERTIES = [
  {
    name: "neighbourhoodName",
    group: "doNotShowInTable",
  },
  {
    name: "builtBefore2000",
    group: "yearBuilt",
    apiField: "BouwjaarVoor2000_45",
    valueFormat: VALUE_FORMATS.PERCENTAGE,
  },
  {
    name: "builtAfter2000",
    group: "yearBuilt",
    apiField: "BouwjaarVanaf2000_46",
    valueFormat: VALUE_FORMATS.PERCENTAGE,
  },
  {
    name: "meanIncomePerResident",
    group: "income",
    apiField: "GemiddeldInkomenPerInwoner_66",
    valueFormat: (apiField, properties) => {
      const income = properties[apiField].value * 1000;
      const incomeBand = getIncomeBand(income);

      return formatIncomeValue(income, incomeBand);
    },
    getColor: (apiField, properties) => {
      const income = properties[apiField].value * 1000;
      const incomeBand = getIncomeBand(income);

      return INCOME_BAND_COLORS[incomeBand];
    },
  },
  {
    name: "meanIncomePerIncomeRecipient",
    group: "income",
    apiField: "GemiddeldInkomenPerInkomensontvanger_65",
    valueFormat: (apiField, properties) => {
      const income = properties[apiField].value * 1000;
      return formatMoney(income);
    },
  },
  {
    name: "veryHighIncomeHouseholds",
    group: "income",
    apiField: "k_20HuishoudensMetHoogsteInkomen_71",
    valueFormat: VALUE_FORMATS.PERCENTAGE,
  },
  {
    name: "lowIncomeHouseholds",
    group: "income",
    apiField: "HuishoudensMetEenLaagInkomen_72",
    valueFormat: VALUE_FORMATS.PERCENTAGE,
  },
  {
    name: "veryLowIncomeHouseholds",
    group: "income",
    apiField: "k_40HuishoudensMetLaagsteInkomen_70",
    valueFormat: VALUE_FORMATS.PERCENTAGE,
  },
  {
    name: "belowSocialMinimumHouseholds",
    group: "income",
    apiField: "HuishOnderOfRondSociaalMinimum_73",
    valueFormat: VALUE_FORMATS.PERCENTAGE,
  },
  {
    name: "residentsAge0to14Percentage",
    group: "residentsAge",
    apiField: "k_0Tot15Jaar_8",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "residentsAge15to24Percentage",
    group: "residentsAge",
    apiField: "k_15Tot25Jaar_9",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "residentsAge25to44Percentage",
    group: "residentsAge",
    apiField: "k_25Tot45Jaar_10",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "residentsAge45to64Percentage",
    group: "residentsAge",
    apiField: "k_45Tot65Jaar_11",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "residentsAge65AndOlder",
    group: "residentsAge",
    apiField: "k_65JaarOfOuder_12",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "nonMarried",
    group: "residentsMaritalStatus",
    apiField: "Ongehuwd_13",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "married",
    group: "residentsMaritalStatus",
    apiField: "Gehuwd_14",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "divorced",
    group: "residentsMaritalStatus",
    apiField: "Gescheiden_15",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "widowed",
    group: "residentsMaritalStatus",
    apiField: "Verweduwd_16",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "singlePersonHouseholds",
    group: "householdType",
    apiField: "Eenpersoonshuishoudens_29",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "householdsWithChildren",
    group: "householdType",
    apiField: "HuishoudensMetKinderen_31",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "householdsWithoutChildren",
    group: "householdType",
    apiField: "HuishoudensZonderKinderen_30",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "rentalProperties",
    group: "propertyOwnership",
    apiField: "HuurwoningenTotaal_41",
    valueFormat: VALUE_FORMATS.PERCENTAGE,
  },
  {
    name: "ownedProperties",
    group: "propertyOwnership",
    apiField: "Koopwoningen_40",
    valueFormat: VALUE_FORMATS.PERCENTAGE,
  },
  {
    name: "singleFamilyResidential",
    group: "buildingType",
    apiField: "PercentageEengezinswoning_36",
    valueFormat: VALUE_FORMATS.PERCENTAGE,
  },
  {
    name: "multiFamilyResidential",
    group: "buildingType",
    apiField: "PercentageMeergezinswoning_37",
    valueFormat: VALUE_FORMATS.PERCENTAGE,
  },
  {
    name: "nonImmigrants",
    group: "immigrationBackground",
    valueFormat: (apiField, properties) => {
      const residentsCount = properties["AantalInwoners_5"].value;
      const westernImmigrantsCount = properties["WestersTotaal_17"].value;
      const nonWesternImmigrantsCount = properties["NietWestersTotaal_18"].value;
      const totalImmigrantsCount = westernImmigrantsCount + nonWesternImmigrantsCount;
      const shareOfImmigrants = totalImmigrantsCount / residentsCount;
      const shareOfNonImmigrants = 1 - shareOfImmigrants;
      const integerPercentage = Math.round(shareOfNonImmigrants * 100);
      return integerPercentage + "%";
    },
  },
  {
    name: "westernImmigrants",
    group: "immigrationBackground",
    apiField: "WestersTotaal_17",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "nonWesternImmigrants",
    group: "immigrationBackground",
    apiField: "NietWestersTotaal_18",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "residentsFromMorocco",
    group: "immigrationBackground",
    apiField: "Marokko_19",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "residentsFromAntillesOrAruba",
    group: "immigrationBackground",
    apiField: "NederlandseAntillenEnAruba_20",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "residentsFromSuriname",
    group: "immigrationBackground",
    apiField: "Suriname_21",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "residentsFromTurkey",
    group: "immigrationBackground",
    apiField: "Turkije_22",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
  {
    name: "residentsOfOtherNonWesternBackground",
    group: "immigrationBackground",
    apiField: "OverigNietWesters_23",
    valueFormat: VALUE_FORMATS.CONVERT_RESIDENTS_COUNT_TO_PERCENTAGE,
  },
];
