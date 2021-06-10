import axios from "axios";

const api = axios.create({
  // baseURL: "",
  baseURL: "http://localhost:3000/api/",
});

export default api;
