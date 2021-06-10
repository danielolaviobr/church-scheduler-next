import axios from "axios";

const api = axios.create({
  // baseURL: "",
  baseURL: "https://church-scheduler-next.vercel.app/api/",
});

export default api;
