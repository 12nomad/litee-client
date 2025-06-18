import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5088/api/v1",
  timeout: 3000,
  withCredentials: true,
});
