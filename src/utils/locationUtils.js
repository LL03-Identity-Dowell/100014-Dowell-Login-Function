export const getUserLocation = () =>
  new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const location = `${latitude} ${longitude}`;
          resolve(location); // Resolve the promise with the retrieved location
        },
        (error) => {
          console.log(error);
          reject(error); // Reject the promise with the error message
        }
      );
    } else {
      reject("Geolocation is not supported");
    }
  });
