function getSphericalMercator(coordinates) {
  const R = 6378137;
  const MAX_LATITUDE = 85.0511287798;

  const d = Math.PI / 180;
  const max = MAX_LATITUDE;
  const lat = Math.max(Math.min(max, coordinates.lat), -max);
  const sin = Math.sin(lat * d);

  return [R * coordinates.lng * d, (R * Math.log((1 + sin) / (1 - sin))) / 2];
}

module.exports = {
  getSphericalMercator
};
