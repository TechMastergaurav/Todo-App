import axios from "axios";
import { getToken } from "../store/auth";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Interceptor for attaching token
api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers = config.headers || {};
    
    // Axios v1 uses a special class for headers
    if (config.headers.set) {
      config.headers.set("Authorization", `Bearer ${token}`);
    } else {
      // fallback for older axios
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return config;
});