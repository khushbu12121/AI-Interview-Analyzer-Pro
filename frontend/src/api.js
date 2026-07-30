import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-interview-analyzer-backend-55sj.onrender.com"
});

api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default api;
