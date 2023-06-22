import axios from "axios";

const API_BASE_URL = "https://100014.pythonanywhere.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
});
