import { useState } from "react"
import Pokemon, { Type, TypePokemon } from "../../iface/pokemon/Pokemon";
import ResponseGeneral from "../../iface/general/ResponseGeneral";
import { getPokemon, getPokemons } from "../../helper/apiCall";
import PokemonEvolution from "../../iface/pokemon/PokemonEvolution";

export const useHomePage: () => any = () => {
  const [page, setPage] = useState<number>(1);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>()
  const [count, setCount] = useState<number | null>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const offset: number = 20;
  const limit: number = 20;

 

  const fetchPokemons: () => void = async () => {
      setIsLoading(true)
      const off: number = (page - 1) * offset;
      const data: ResponseGeneral | undefined = await getPokemons(off, limit);
      setCount(data?.count)
  
      if (data != undefined) {
        const pokemons: Pokemon[] = await Promise.all(
          data.results.map(async (singleData) => {
            try {
              const fetchedPokemon: any = await getPokemon(singleData.url, null);
              let id: number = fetchedPokemon.id;
              let pokemonName: string = fetchedPokemon.name;
              let types: Type[] = fetchedPokemon.types.map((type: TypePokemon) => {
                return {
                  name: type.type.name
                }
              });
              let imageUrl: string =
                fetchedPokemon.sprites.other["official-artwork"].front_default;
              let evolve: PokemonEvolution = {
                chain: [],
                isAnEvolvedSpecies: false,
              };
    
              return {
                id,
                name: pokemonName,
                imageUrl,
                statistic: [],
                about: [],
                types,
                evolve,
                moves: [],
              };
            } catch (error) {
                return {
                id: 0,
                name: "error",
                imageUrl: "error",
                statistic: [],
                about: [],
                types: [],
                evolve: { chain: [], isAnEvolvedSpecies: false},
                moves: []
               }
              }
            }
          )
        );
  
        setPokemonList(pokemons);
        setIsLoading(false);
      }
    };

 return {
  page,
  setPage,
  pokemonList,
  setPokemonList, 
  fetchPokemons, 
  limit,
  count,
  setCount,
  isLoading, 
  setIsLoading
 }
}