import axios, { AxiosInstance } from "axios";

const AxiosInstances: AxiosInstance  = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export default AxiosInstances;
