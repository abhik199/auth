import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3200",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// List of all the endpoints

export const register = (data) => api.post("/add", data);
export const login = (data) => api.post("/login", data);
export const fetchUserById = (id) => api.get(`/get/${id}`);
export const fetchUserAll = () => api.get("/get");
export const logoutUser = () => api.post("/logout");
export const LogeIn = () => api.get("/authenticate");

export default api;
