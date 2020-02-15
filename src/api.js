function fetchCoordinates(zipCode) {
  // TODO: Use real API
  return Promise.resolve({ lat: 52.3028, lng: 4.8764 });
}

async function fetchNeighbourhood(sphericalMercator) {
  const bbox = [
    sphericalMercator[0] - 50,
    sphericalMercator[1] - 50,
    sphericalMercator[0] + 50,
    sphericalMercator[1] + 50
  ];

  const parameters = {
    service: "WMS",
    request: "GetFeatureInfo",
    version: "1.1.1",
    layers: "cbs_buurten_2015",
    styles:
      "wijkenbuurten_thema_buurten_gemeentewijkbuurt_gemiddeld_inkomen_inwoner",
    format: "image/png",
    transparent: true,
    width: 100,
    height: 100,
    X: 50,
    Y: 50,
    bbox,
    srs: "EPSG:3857",
    query_layers: "cbs_buurten_2015",
    info_format: "application/json"
  };

  const url = getUrl(parameters);

  const response = await fetch(url);
  const responseJson = await response.json();

  return responseJson;
}

function getUrl(parameters) {
  const parametersString = Object.entries(parameters)
    .map(([name, value]) => `${name}=${encodeURIComponent(value)}`)
    .join("&");

  return `https://geodata.nationaalgeoregister.nl/wijkenbuurten2015/wms?${parametersString}`;
}

module.exports = {
  fetchCoordinates,
  fetchNeighbourhood
};
