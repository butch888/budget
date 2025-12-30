// http://localhost:5000/api/
import axios from "axios";
import { getTokenFromLocalstorage } from "../helpers/localstarage.helper";

export const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Добавляем интерцептор для каждого запроса
instance.interceptors.request.use((config) => {
  const token = getTokenFromLocalstorage();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Добавляем обработчик ошибок
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  },
);
