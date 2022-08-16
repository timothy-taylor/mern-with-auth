import axios from "axios";

export const axiosClient = axios.create({ baseURL: "http://localhost:3001", timeout: 3000 });
