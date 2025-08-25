import axios from "axios";
import useUserStore from "../store/useUserStore";

// fetch function

const baseURL =
  import.meta.env.MODE === "development"
    ? "/api"
    : import.meta.env.VITE_API_BASE_URL;

console.log("Base URL:", baseURL);

const publicFetch = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const privateFetch = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-api-key": import.meta.env.VITE_API_KEY,
  },
});
console.log("API Key:", import.meta.env.VITE_API_KEY);

export { publicFetch, privateFetch };
