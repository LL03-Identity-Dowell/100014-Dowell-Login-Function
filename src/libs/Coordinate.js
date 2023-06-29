import { getUserLocation } from "./locationUtils";

const Coordinate = async () => {
  try {
    const location = await getUserLocation();
    return location;
  } catch (error) {
    console.log(error);
  }
};

export default Coordinate;
