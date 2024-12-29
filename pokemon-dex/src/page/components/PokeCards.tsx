import React from 'react'
import { PokemonCardIface } from '../../iface/general/PokemonCard'
import Pokemon from '../../iface/pokemon/Pokemon';
import TypeList from './TypeList';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const PokeCards: React.FC<PokemonCardIface> = ({ pokemonList, isLoading}) => {
  const navigate: NavigateFunction = useNavigate()

  const handleClickPoke: (id: number) => void = (id) => {
    navigate(`/pokemon/${id}`)
  }

  return (
    <>
      { !isLoading ? (
        pokemonList.map((pokemon: Pokemon) => {
          const bgColorClass = `${pokemon.types[0]?.name}`; 
          const className = `relative rounded-3xl col-span-1 max-h-full h-full ${bgColorClass} font-extrabold p-4 pt-8 pl-8
          grid grid-rows-8`

          return (
            <div onClick={() => handleClickPoke(pokemon.id)} className={className} key={pokemon.id}>
              <div className='pokeball-card'>
                <div className={`button-card ${bgColorClass}`}></div>
              </div>
              <div className="row-span-2">
                <p className="xl:text-5xl lg:text-5xl md:text-3xl text-3xl">{pokemon.name}</p>
              </div>
              <div className="relative row-span-6 grid grid-cols-6 text-xl gap-2">
                <div className="col-span-2 max-h-full grid grid-rows-4 gap-2 lg:grid-rows-6">
                  <TypeList typeList={pokemon.types} order="rows"/>
                </div>
                <div className="col-span-4 max-h-full bg-transparent">
                  <img src={pokemon.imageUrl} alt={pokemon.name} 
                  className="max-w-full max-h-full h-full object-contain mx-auto z-10
                  "/>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="row-span-6">Loading...</div>
      )}
    </>
  )
}

export default PokeCards