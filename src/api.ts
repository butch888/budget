/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const api = {
  get: (endpoint: string) => fetch(`${API_URL}${endpoint}`).then((res) => res.json()),

  post: (endpoint: string, data: any) =>
    fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),

  put: (endpoint: string, data: any) =>
    fetch(`${API_URL}${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),

  delete: (endpoint: string) => fetch(`${API_URL}${endpoint}`, { method: "DELETE" }),
};
