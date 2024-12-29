import Pokemon, { Type } from "../pokemon/Pokemon";

export interface PokemonTypeList {
  typeList: Type[],
  order: string
}

export interface PokemonCardIface {
  pokemonList: Pokemon[],
  isLoading: boolean
}

export interface PaginationIface {
  page: number,
  setPage: Function,
  limit: number,
  count: number
}