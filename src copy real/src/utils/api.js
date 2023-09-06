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
    "X-CSRF-TOKEN": `${token || startToken}`
  },
});

export default libraryAPI;
