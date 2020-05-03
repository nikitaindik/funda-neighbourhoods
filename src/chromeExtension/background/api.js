const API_ID_BY_YEAR = {
  2015: "83220NED",
  2016: "83487NED",
  2017: "83765NED",
  2018: "84286NED",
  2019: "84583NED",
};

export async function fetchNeighbourhoodCode(zipCode) {
  const parameters = {
    q: zipCode,
    fq: "type:adres",
    rows: 1,
  };

  const urlParametersString = getParametersString(parameters);

  const response = await fetch(`https://geodata.nationaalgeoregister.nl/locatieserver/v3/free?${urlParametersString}`);

  const responseJson = await response.json();

  try {
    const firstPayloadItem = responseJson.response.docs[0];
    return {
      neighbourhoodCode: firstPayloadItem.buurtcode,
      neighbourhoodName: firstPayloadItem.buurtnaam,
    };
  } catch (error) {
    return null;
  }
}

export async function fetchNeighbourhood(neigbourhoodCode) {
  const neigbourhoodStatsWithYears = await getNeigbourhoodStatsWithYears(neigbourhoodCode);

  return mergeYearlyData(neigbourhoodStatsWithYears);
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

function processNeigbourhoodDataFromApi(year, dataForYear) {
  const withoutEmptyFields = removeEmptyFields(dataForYear);
  const withYears = addYearToEveryField(withoutEmptyFields, year);
  return withYears;
}

function mergeYearlyData(yearlyData) {
  return Object.assign({}, ...yearlyData);
}

async function getNeigbourhoodStatsWithYears(neigbourhoodCode) {
  const years = Object.keys(API_ID_BY_YEAR);

  const requests = years.map(async year => {
    const apiId = API_ID_BY_YEAR[year];

    const neighbourhoodDataForYear = await fetchDataForYear(apiId, neigbourhoodCode);

    return processNeigbourhoodDataFromApi(year, neighbourhoodDataForYear);
  });

  const yearlyDataForNeighbourhood = await Promise.all(requests);

  return yearlyDataForNeighbourhood;
}

async function fetchDataForYear(apiId, neigbourhoodCode) {
  const parameters = `$filter=WijkenEnBuurten eq '${neigbourhoodCode}'`;

  const response = await fetch(`https://opendata.cbs.nl/ODataApi/odata/${apiId}/TypedDataSet?${parameters}`);
  const responseJson = await response.json();

  try {
    return responseJson.value[0];
  } catch (error) {
    return null;
  }
}

function getParametersString(parameters) {
  return Object.entries(parameters)
    .map(([name, value]) => `${name}=${encodeURIComponent(value)}`)
    .join("&");
}
