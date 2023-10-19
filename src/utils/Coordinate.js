const Coordinate = () => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const location = `${latitude} ${longitude}`;
          console.log("loc", location);
          resolve(location);
        },
        (error) => {
          console.error("Error getting user location:", error);
          reject("Unavailable");
        }
      );
    } else {
      console.error("Geolocation is not supported");
      reject("Geolocation is not supported");
    }
  });
};

export default Coordinate;
