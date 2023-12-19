/**
 * Make API calls to search for the coordinates of a location name or postal code. Rejects HTTP errors.
 * @param {String} query location name or postal code
 * @returns {Promise<JSON>} Raw JSON object
 */
async function getRawGeocode(query) {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=20`);
    // Throw HTTP errors
    if(!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
}

/**
 * Filter result getRawGeocode for just the data we need
 * @param {String} query location name or postal code
 * @returns {Promise<Array<Object>>} Resolves to an array of search results
 */
async function getGeocode(query) {
    // Default to empty array if the results is empty
    const { results = [] } = await getRawGeocode(query);

    // Filter for only the data we need
    return results.map(({name, latitude, longitude, country, admin1}) => {
        return {name, latitude, longitude, country, admin1};
    })
}

export { getGeocode }