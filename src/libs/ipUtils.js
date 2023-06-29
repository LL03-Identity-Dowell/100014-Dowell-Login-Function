import { getIP } from "ipify";

export async function getUserIP() {
  try {
    const ip = await getIP();
    return ip; // Return the retrieved IP address
  } catch (error) {
    console.log(error);
    return null; // Return null or handle the error as needed
  }
}
