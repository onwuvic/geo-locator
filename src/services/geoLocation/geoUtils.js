const geolib = require('geolib');
const getGeoData = require('./getGeoData');

function isPointInPolygon(points) {
  const polygon = getGeoData();
  return geolib.isPointInPolygon(points, polygon);
}

function isValidCoordinate({lat, lng}) {
  if (lat && lng) {
    return geolib.isValidCoordinate({latitude: lat, longitude: lng});
  }
  return false;
}

module.exports = {isPointInPolygon, isValidCoordinate};