import axios from "axios";

const API_BASE_URL = "https://100014.pythonanywhere.com";

export const instance = axios.create({
  baseURL: API_BASE_URL,
});
