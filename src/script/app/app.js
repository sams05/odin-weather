
// Promisification of navigator.geolocation.getCurrentPosition
/*
async function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            resolve({ latitude, longitude });
        }, reject);
    });
}
*/

export { default as interpretWeatherCode } from './weather-code-mapping';
export { getWeatherData } from './weather-data';
export { getGeocode } from './geocoding';