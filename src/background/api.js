const STATS_API_ID_BY_YEAR = {
  2015: "83220NED",
  2016: "83487NED",
  2017: "83765NED",
  2018: "84286NED",
  2019: "84583NED",
  2020: "84799NED",
  2021: "85039NED",
  2022: "85318NED",
};

export async function fetchNeighbourhoodMeta(zipCode) {
  const parameters = {
    q: zipCode,
    fq: "type:adres",
    rows: 1,
  };

  const urlParametersString = getParametersString(parameters);

  try {
    const response = await fetch(`https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?${urlParametersString}`);

    const responseJson = await response.json();

    const { buurtcode, buurtnaam, gemeentenaam } = responseJson.response.docs[0];

    if (!buurtcode) {
      return { error: `No buurtcode for zipCode ${zipCode} in API response` };
    }

    return {
      neighbourhoodCode: buurtcode,
      neighbourhoodName: buurtnaam,
      municipalityName: gemeentenaam,
    };
  } catch (error) {
    return { error: `Failed to fetch neighbourhood meta for zipCode ${zipCode}. Additional info: ${error.message}` };
  }
}

export async function fetchNeighbourhoodStats(neighbourhoodCode) {
  const neighbourhoodStatsWithYears = await getNeighbourhoodStatsWithYears(neighbourhoodCode);

  return mergeYearlyData(neighbourhoodStatsWithYears);
}

async function getNeighbourhoodStatsWithYears(neighbourhoodCode) {
  const years = Object.keys(STATS_API_ID_BY_YEAR);

  const requests = years.map(async year => {
    const apiId = STATS_API_ID_BY_YEAR[year];

    const neighbourhoodDataForYear = await fetchDataForYear(apiId, neighbourhoodCode);

    if (!neighbourhoodDataForYear) {
      console.error("Failed to fetch neighbourhood stats for year:", year, "apiId:", apiId);
      return null;
    }

    return processNeighbourhoodDataFromApi(year, neighbourhoodDataForYear);
  });

  const yearlyDataForNeighbourhood = await Promise.all(requests);

  return yearlyDataForNeighbourhood.filter(dataForYear => dataForYear !== null);
}

async function fetchDataForYear(apiId, neighbourhoodCode) {
  const parameters = `$filter=WijkenEnBuurten eq '${neighbourhoodCode}'`;
  const requestUrl = `https://opendata.cbs.nl/ODataApi/odata/${apiId}/TypedDataSet?${parameters}`;

  try {
    const response = await fetch(requestUrl);
    const responseJson = await response.json();
    return responseJson.value[0];
  } catch (error) {
    return null;
  }
}

function mergeYearlyData(yearlyData) {
  return Object.assign({}, ...yearlyData);
}

function removeEmptyFields(dataForYear) {
  const entries = Object.entries(dataForYear);
  const nonEmptyEntries = entries.filter(([, value]) => value !== null);
  return Object.fromEntries(nonEmptyEntries);
}

function addYearToEveryField(dataForYear, year) {
  const entries = Object.entries(dataForYear);
  const entriesWithYears = entries.map(([fieldName, fieldValue]) => [
    fieldName,
    { year: Number(year), value: fieldValue },
  ]);
  return Object.fromEntries(entriesWithYears);
}

function processNeighbourhoodDataFromApi(year, dataForYear) {
  const withoutEmptyFields = removeEmptyFields(dataForYear);
  const withYears = addYearToEveryField(withoutEmptyFields, year);
  return withYears;
}

function getParametersString(parameters) {
  return Object.entries(parameters)
    .map(([name, value]) => `${name}=${encodeURIComponent(value)}`)
    .join("&");
}
