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
          if (error.code === 1) {
            reject(new Error("User denied Geolocation"));
          } else {
            reject(error); // Reject the promise with the error message
          }
        }
      );
    } else {
      reject(new Error("Geolocation is not supported"));
    }
  });
