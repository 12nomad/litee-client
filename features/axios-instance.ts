import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL!,
  timeout: 3000,
  withCredentials: true,
});
