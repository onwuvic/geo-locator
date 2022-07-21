const { UserInputError } = require('apollo-server');
const axios = require('axios')
const env = require('../../configs/env-formatted')

const url = 'https://maps.googleapis.com/maps/api/geocode/json'

async function addressToCoordinate(address) {
  try {
    const encodeUrl = encodeURI(`${url}?address=${address}&key=${env.googleAPIKey}`)
    const response = await axios.get(encodeUrl)
    const { results } = response.data
    if (results.length === 0) return null
    const { geometry } = results[0]
    const { location } = geometry
    return location
  } catch (error) {
    return null
  }
}

module.exports = addressToCoordinate;