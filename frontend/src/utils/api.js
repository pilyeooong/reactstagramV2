import axios from "axios";
import { makeUseAxios } from "axios-hooks";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000"
})

export const useAxios = makeUseAxios({
  axios: axiosInstance
})