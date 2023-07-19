const Coordinate = async () => {
  let location = null;

  try {
    if ("geolocation" in navigator) {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      location = `${latitude} ${longitude}`;
    } else {
      location = "Geolocation is not supported";
    }
  } catch (error) {
    console.log("Error getting user location:", error);
    location = "Unavailable";
  }

  return location;
};

export default Coordinate;
