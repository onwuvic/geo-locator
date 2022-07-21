
const { UserInputError } = require('apollo-server');
const { isPointInPolygon, isValidCoordinate } = require('../../services/geoLocation/geoUtils');
const addressToCoordinate = require('../../services/geoLocation/addressToCoordinate');

async function geoLocator(parent, { address, coordinate }, context) {
  if (!address && !coordinate) {
    throw new UserInputError('Please provide an address or coordinate');
  }

  if (coordinate) {
    const {lat, lng} = coordinate;
    const isValid = isValidCoordinate({ lat, lng });
    if (!isValid) throw new UserInputError('Invalid coordinate');
    return isPointInPolygon([lng, lat]);
  }

  if (address) {
    const coordinate = await addressToCoordinate(address);
    if (!coordinate) throw new UserInputError('Invalid address');
    const {lat, lng} = coordinate;
    return isPointInPolygon([lng, lat]);
  }
}

module.exports = { Query: { geoLocator } }
