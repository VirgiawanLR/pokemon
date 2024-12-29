import PokemonEvolution from "./PokemonEvolution";
import PokemonMoves from "./PokemonMoves";
import PokemonStatistics, { PokemonAbout } from "./PokemonStatistics";

export interface Type {
  name:String
}

export interface TypePokemon {
  type: Type
}

export default interface Pokemon {
  id: number,
  name: string, 
  imageUrl: string,
  statistic: PokemonStatistics[],
  about: PokemonAbout[],
  moves: PokemonMoves[],
  types: Type[],
  evolve: PokemonEvolution
}