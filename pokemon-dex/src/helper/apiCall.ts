import axios, { AxiosResponse } from "axios";
import axiosInstances from "./AxiosInstances"
import ResponseGeneral from "../iface/general/ResponseGeneral";

export const getPokemons: (offset: number, limit: number) => Promise<ResponseGeneral | undefined> = async (offset, limit = 20) => {
  let data: ResponseGeneral
  try {
    const response: AxiosResponse<any, any> = await axiosInstances.get(`pokemon/?offset=${offset}&limit=${limit}`)
    data = response.data
    return data
  } catch (error) {
    console.error(error)
  }
}

export const getPokemon: (url: string | null, idOrName:string | null) => Promise<any> = async (url, idOrName) => {
  try {
    let response: AxiosResponse<any, any>;
    if (url != null && url != "") {
      response = await axios.get(url)
    } else {
      response = await axiosInstances.get(`pokemon/${idOrName}`)
    }
    return response.data
  } catch (error) {
    console.error(`Error fetching Pokemon from URL: ${url}`)
    throw new Error(`Failed fetching Pokemon from URL: ${url}`)
  }
}

export const getEvolution: (url: string) => Promise<any> = async (url) => {
  try {
    let response: AxiosResponse<any, any> = await axios.get(url)
    
    let evolutionData: AxiosResponse<any, any> = await axios.get(response?.data?.evolution_chain?.url)
    return evolutionData.data
  } catch (error) {
    console.error(`Error fetching Pokemon Evolution Data from URL: ${url}`)
    throw new Error(`Failed fetching Pokemon Evolution Data from URL: ${url}`)
  }
}

export const getMove: (url:string) => Promise<any> = async (url) => {
  try {
    let response: AxiosResponse<any, any> = await axios.get(url)
    return response.data
  } catch (error) {
    console.error(`Error fetching Pokemon Move Data from URL: ${url}`)
    throw new Error(`Failed fetching Pokemon Move Data from URL: ${url}`)
  }
}