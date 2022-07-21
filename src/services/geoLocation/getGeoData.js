const data = require('../../configs/data/geojson.json')

function getGeoData() {
  return data.features[0].geometry.coordinates[0];
}

module.exports = getGeoData;