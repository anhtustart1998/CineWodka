import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const TOKEN_CYBERSOFT = import.meta.env.VITE_TOKEN_CYBERSOFT;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
    "Content-Type": "application/json-patch+json",
  },
});
