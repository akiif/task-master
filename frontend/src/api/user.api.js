import axios from "axios";
import configData from "../config/config.json";

const serverUrl = configData.SERVER_URL;

const axiosRequest = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
})

export default axiosRequest;

