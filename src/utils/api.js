import axios from "axios";
import GetToken from "./GetToken";

const url = "https://tim2.petardev.live/api";
const startToken = "b3Rvcmlub2xhcmluZ29sb2dpamE=";
const { token } = GetToken();

const libraryAPI = axios.create({
  baseURL: url,
  headers: {
    Authorization: `Bearer ${token || startToken}`,
    "Content-Type": "application/json",
    // "X-CSRF-TOKEN": `${token || startToken}`
  },
});

libraryAPI.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    config.headers["Authorization"] = `Bearer ${token ? token : startToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

libraryAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      if (window.location.pathname !== "/login") {
        sessionStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default libraryAPI;
