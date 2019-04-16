import axios from 'axios';

const backendURL = "http://localhost:3000/";

export function api() {
  const instance = axios.create({
    baseURL: backendURL,
  });

  return instance;
}