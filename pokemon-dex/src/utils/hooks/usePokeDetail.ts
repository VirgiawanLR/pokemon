import { useState } from "react"
import { NavigateFunction, useNavigate, useParams } from "react-router-dom"
import { getEvolution, getPokemon } from "../../helper/apiCall"
import Pokemon, { Type, TypePokemon } from "../../iface/pokemon/Pokemon"
import PokemonEvolution from "../../iface/pokemon/PokemonEvolution"
import PokemonStatistics, { PokemonAbout, Stats } from "../../iface/pokemon/PokemonStatistics"
import PokemonMoves from "../../iface/pokemon/PokemonMoves"

export const usePokeDetail: () => any = () => {
  interface Subs {
      name: string,
      isActive: boolean
  }

  const navigate: NavigateFunction = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [pokeData, setPokeData] = useState<Pokemon | null>()
  let [subDetails, setSubDetails] = useState<Subs[]>(
    [{name:"About", isActive:true},
    {name:"Base Stats", isActive:false},
    {name:"Evolution", isActive:false},
    {name:"Moves", isActive:false}]
  )
  const { id } = useParams()
  const pokeId = id ? id : "0"

  const fetchPokemon: () => void = async () => {
    setIsLoading(true)
    try {
      const fetchedPokemon: any = await getPokemon(null, pokeId);
      
      // populate name
      let pokemonName: string = fetchedPokemon.name;
      // populate type
      let types: Type[] = fetchedPokemon.types.map((type: TypePokemon) => {
        return {
          name: type.type.name
        }
      });
      // populate image
      let imageUrl: string = fetchedPokemon.sprites.other["official-artwork"].front_default;
      // populate pokeEvolution
      let evolve: PokemonEvolution = await fetchEvoChain(fetchedPokemon?.species?.url, pokemonName)
      // populate statistics
      let statistic: PokemonStatistics[] = getStatistic(fetchedPokemon)
      // populate about details
      let pokeAbout: PokemonAbout[] = getAbout(fetchedPokemon)
      // populate poke moves
      let pokeMoves: PokemonMoves[] = getMoves(fetchedPokemon)

      // populate pokemon data
      setPokeData({
        id: parseInt(pokeId),
        name: pokemonName,
        imageUrl,
        statistic,
        about: pokeAbout,
        moves: pokeMoves,
        evolve,
        types
      })

      setIsLoading(false)
      
    } catch (error) {
      console.error(error)
      navigate("/")
      
    }
  }

  const getMoves: (data: any) => PokemonMoves[] = (data: any) => {
    const pokeMoves: PokemonMoves[] = []
    data.moves.forEach((move:any) => {
      pokeMoves.push({
        name: move.move.name,
        type: "",
        accuracy: 0,
        power: 0,
        lvl_learnt: move.version_group_details[0].level_learned_at,
        url: move.move.url
      })
    })

    return pokeMoves
  }

  const fetchEvoChain: (url:string, name:string) => Promise<PokemonEvolution> = async (url) => {
    
    let pokeEvo: PokemonEvolution = {
      chain: [],
      isAnEvolvedSpecies: false
    }

    const data = await getEvolution(url)
    let chain: any = data.chain
    while (chain.evolves_to.length != 0) {
      pokeEvo.chain.push(chain.species.name);
      chain = chain.evolves_to[0]
    }
    pokeEvo.chain.push(chain.species.name)
    return pokeEvo
  }

  const getStatistic: (data: any) => PokemonStatistics[] = (data) => {
    const pokeStats: PokemonStatistics[] = []
    
    data.stats.forEach((stat: Stats) => {
      pokeStats.push({ 
        name: stat.stat.name,
        base_stat: stat.base_stat
      })
    })

    return pokeStats
  }

  const getAbout: (data: any) => PokemonAbout[] = (data) => {
    const pokeAbout: PokemonAbout[] = []
    pokeAbout.push({
      name: "Height",
      base_stat: null,
      details: data.height
    })

    pokeAbout.push({
      name: "Weight",
      base_stat: null,
      details: data.weight
    })
    
    const abilities: string[] = []
    data.abilities.forEach((ability: any) => {
      abilities.push(ability.ability.name)
    })
    pokeAbout.push({
      name: "Abilities",
      base_stat: null,
      details: abilities.join(", ")
    })

    const heldItems: string[] = []
    data.held_items.forEach((item: any) => {
      console.log("test item")
      abilities.push(item.item.name)
    })
    pokeAbout.push({
      name: "Held Items",
      base_stat: null,
      details: heldItems.join(",")
    })

    return pokeAbout
  }
  
  return {
    fetchPokemon, isLoading, setIsLoading, navigate, pokeData, setPokeData, subDetails, setSubDetails
  }
}