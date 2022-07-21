const createTestServer = require('../helper')

describe('resolvers: geolocation: findLocation', () => {
  it('returns invalid address error when address is invalid', async () => {
    const result = await createTestServer.executeOperation({
      query: 'query GeoLocator($address: String, $coordinate: Coordinate) { geoLocator(address: $address, coordinate: $coordinate) }',
      variables: { address: 'New' },
    });

    expect(result.errors[0].message).toBe('Invalid address');
  });

  it('test when address is valid but not in the polygon', async () => {
    const result = await createTestServer.executeOperation({
      query: 'query GeoLocator($address: String, $coordinate: Coordinate) { geoLocator(address: $address, coordinate: $coordinate) }',
      variables: { address: 'New york' },
    });

    expect(result.data?.geoLocator).toBe(false);
  });

  it('test when address is valid and in the polygon', async () => {
    const result = await createTestServer.executeOperation({
      query: 'query GeoLocator($address: String, $coordinate: Coordinate) { geoLocator(address: $address, coordinate: $coordinate) }',
      variables: { address: 'Unter den Linden 6, 10117 Berlin' },
    });

    expect(result.data?.geoLocator).toBe(true);
  });

  it('test when coordinate is invalid', async () => {
    const result = await createTestServer.executeOperation({
      query: 'query GeoLocator($address: String, $coordinate: Coordinate) { geoLocator(address: $address, coordinate: $coordinate) }',
      variables: { coordinate: { lat: 10000.0, lng: 8992 } },
    });

    expect(result.errors[0].message).toBe('Invalid coordinate');
  });

  it('test when coordinate is valid but not in the polygon', async () => {
    const result = await createTestServer.executeOperation({
      query: 'query GeoLocator($address: String, $coordinate: Coordinate) { geoLocator(address: $address, coordinate: $coordinate) }',
      variables: { coordinate: {lat: 52.3, lng: 13.7} },
    });

    expect(result.data?.geoLocator).toBe(false);
  });

  it('test when coordinate is valid and in the polygon', async () => {
    const result = await createTestServer.executeOperation({
      query: 'query GeoLocator($address: String, $coordinate: Coordinate) { geoLocator(address: $address, coordinate: $coordinate) }',
      variables: { coordinate: {lat: 52.518170979867605, lng: 13.393935475430306} },
    });

    expect(result.data?.geoLocator).toBe(true);
  });
});


