import { getIP } from "ipify";

export const getUserIP = async () => {
  try {
    const ip = await getIP();
    return ip; // Return the retrieved IP address
  } catch (error) {
    console.log(error);
    return null; // Return null or handle the error as needed
  }
};
