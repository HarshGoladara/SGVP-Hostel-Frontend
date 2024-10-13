import axios from "axios";

const axiosHandler = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true, //backend we can access cookie
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosHandler };
