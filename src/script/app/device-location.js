/**
 * Promisification of navigator.geolocation.getCurrentPosition for getting the location of the user's device
 * @returns {Promise<Object>} Promise resolving to an object with latitude and longitude or 
 * rejecting with GeolocationPositionError
 */
async function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            resolve({ latitude, longitude });
            // Rejection will resolve to a GeolocationPositionError object
        }, reject);
    });
}

export { getCurrentLocation };