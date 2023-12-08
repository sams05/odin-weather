
async function getRawGeocode(query) {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=20`);
    
    return response.json();
}

async function getGeocode(query) {
    const { results } = await getRawGeocode(query);

    // Filter for only the data we need
    return results.map(({name, latitude, longitude, country, admin1}) => {
        return {name, latitude, longitude, country, admin1};
    })
}

export { getGeocode }