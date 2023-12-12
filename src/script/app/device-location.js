// Promisification of navigator.geolocation.getCurrentPosition
async function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            resolve({ latitude, longitude });
        // Rejection will resolve to a GeolocationPositionError object
        }, reject);
    });
}

export { getCurrentLocation };