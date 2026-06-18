import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("bl_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const authAPI = {
  register: (data) => API.post("/auth/register", data),
  login: (data) => API.post("/auth/login", data),
  me: () => API.get("/auth/me"),
};

export const eventsAPI = {
  getAll: () => API.get("/events"),
};

export const leaderboardAPI = {
  getAll: () => API.get("/leaderboard"),
};

export const ecosystemAPI = {
  signup: (data) => API.post("/ecosystem", data),
};

export default API;
