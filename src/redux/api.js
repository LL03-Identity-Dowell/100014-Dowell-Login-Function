import axios from "axios";

const API_BASE_URL = "https://100074.pythonanywhere.com";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const signup = (userData) => {
  return api.get("/countries", userData);
};
