import axios from 'axios';

const url = 'https://petardev.live/api';
const token = 'b3Rvcmlub2xhcmluZ29sb2dpamE=';
const libraryAPI = axios.create({
  baseURL: url,
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'X-CSRF-TOKEN': `${token}`
  },
});

export default libraryAPI;
