import React, { useEffect, useState } from 'react'
import Pokemon from '../../iface/pokemon/Pokemon'
import PokemonEvolution from '../../iface/pokemon/PokemonEvolution'
import { getPokemon } from '../../helper/apiCall'

interface EvolutionIface {
  pokemon: Pokemon
}

interface PokeEvol {
  imageUrl: string | null,
  id: number,
  name: string | null, 
  index: number
}

const Evolution: React.FC<EvolutionIface> = ({pokemon}) => {

  const [isEvolLoading, setIsEvolLoading] = useState<boolean>(true)
  const [pokeList, setPokeList] = useState<PokeEvol[]>([{ imageUrl: "", id:0, name: "", index:0 }])

  const evol: PokemonEvolution = pokemon.evolve
  const type: String = pokemon.types[0].name
  const length: number = evol.chain.length
  const className: string = `h-full bg-mainBg grid grid-rows-${length} overflow-hidden
  px-8 gap-8 md:px-12 md:gap-12 lg:px-16 lg:gap-20 text-xl md:text-2xl lg:text-4xl
  py-4`

  const thisIndex: number = evol.chain.indexOf(pokemon.name)

  const fetchChain: () => void = async () => {
    setIsEvolLoading(true)
    const chain : string[] = evol.chain
    let poke : PokeEvol[] = await Promise.all(
      chain.map(async (pokemon:string, index: number) => {
        try {
          const fetchedPokemon = await getPokemon(null, pokemon)
          let id: number = fetchedPokemon.id;
          let name: string = fetchedPokemon.name;
          let imageUrl: string =
                fetchedPokemon.sprites.other["official-artwork"].front_default;
          return {
            imageUrl, id, name, index
          }
        } catch (error) {
          console.error(error)
          return { imageUrl: "", id:0, name: "", index }
        }
      })
    )
    const pokeNew: PokeEvol[] = poke.sort((a:PokeEvol, b:PokeEvol) => a.index - b.index)
    setPokeList(pokeNew)
    setIsEvolLoading(false)
  }

  useEffect(() => {
    fetchChain()
  }, [])
  
  return (
    <>
    { isEvolLoading ? <div>Loading ...</div> :
    <div className={className}>
      {pokeList.map((pokeChain: PokeEvol, index:number) => {
        const imageUrl: string = `url('${pokeChain.imageUrl}')`
        const detail: string = index < thisIndex ? "Prev. Evol" :
          index > thisIndex ? "Next Evol" : "Current"
        return (
          <div className="row-span-1 grid grid-cols-3 text-white text-lg md:text-4xl" key={index} >
            <div className=" col-span-1 textSecondary my-auto">{detail}</div>
            <div className={`col-span-2 font-bold my-auto h-3/4 overflow-hidden rounded-xl md:h-full ${type}`}
            >
              <div className="h-full w-full relative" style={{
              backgroundImage: imageUrl,
              backgroundPosition: "0px -40px",
              backgroundRepeat: "no-repeat"
            }}>
                <p className="absolute right-2 bottom-1 font-extrabold md:text-6xl">{pokeChain.name}</p></div>
            </div>
          </div>
        )
      })}
    </div>
    }
    </>
  )
}

export default Evolution