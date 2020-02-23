const INCOME_BANDS = {
  noInfo: "noInfo",
  veryHigh: "veryHigh",
  high: "high",
  average: "average",
  belowAverage: "belowAverage",
  low: "low",
  veryLow: "veryLow",
  extremelyLow: "extremelyLow"
};

const INCOME_BAND_COLORS = {
  [INCOME_BANDS.noInfo]: "#c0c0c0",
  [INCOME_BANDS.veryHigh]: "#d62f28",
  [INCOME_BANDS.high]: "#ed7550",
  [INCOME_BANDS.average]: "#fab681",
  [INCOME_BANDS.belowAverage]: "#fdd835",
  [INCOME_BANDS.low]: "#c1ccbe",
  [INCOME_BANDS.veryLow]: "#849eba",
  [INCOME_BANDS.extremelyLow]: "#4575b5"
};

const DEFAULT_COLOR = "#607d8b";

module.exports = {
  INCOME_BANDS,
  INCOME_BAND_COLORS,
  DEFAULT_COLOR
};
