import React, { useEffect } from 'react'
import { usePokeDetail } from '../utils/hooks/usePokeDetail'
import { formatNumber } from '../utils/util/stringUtil'
import TypeList from './components/TypeList'
import About from './components/About'
import BaseStats from './components/BaseStats'
import Evolution from './components/Evolution'
import Moves from './components/Moves'

const PokemonDetail: React.FC = () => {

  const {fetchPokemon, isLoading, pokeData, subDetails, setSubDetails} = usePokeDetail()

  function handleClickDetails(index: number) {
    const newSub: any = subDetails.map((sub:any, idx:number) => {
      if (index != idx) return {...sub, isActive:false}
      return {...sub, isActive:true}
    })
    setSubDetails(newSub)
  }

  useEffect(() => {
    fetchPokemon()
  }, [])

  useEffect(() => {}, [subDetails])

  return (
    <>
    {isLoading ?
      <div>Loading...</div>
      :
      <div className="bg-mainBg maxvw maxvh grid grid-rows-2 overflow-hidden">
        <div className={`bg-black row-span-1 ${pokeData.types[0].name} grid grid-rows-3`}>
          <div className="row-span-1 text-white p-6 pt-10 flex justify-between">
            <div className="w-full max-h-full h-full flex flex-col justify-center gap-4">
              <div className="h-fit text-4xl lg:text-6xl font-extrabold">{pokeData.name}</div>
              <div className="col-span-2 max-h-full grid grid-cols-3 gap-2 lg:grid-cols-6">
                <TypeList typeList={pokeData.types} order="col"/>
              </div>
            </div>
            <div className="h-fit w-fit font-bold text-2xl lg:text-4xl">
              {formatNumber(pokeData.id)}
            </div>
          </div>
          <div className="row-span-2 relative">
            <div className="pokeball-detail-poke">
              <div className={`button-detail-poke ${pokeData.types[0].name}`}></div>
            </div>
          </div>
        </div>
        <div className="bg-white row-span-1 rounded-t-3xl -mt-10 z-10 grid grid-rows-8">
          <div className="row-span-1 mx-auto">
            <img src={pokeData.imageUrl} alt={pokeData.name} 
            className="image-size-lg"/>
          </div>
          <div className="row-span-1 grid grid-rows-2">
            <div className="row-span-1 gap-2 px-2 grid grid-cols-4 md:gap-4 md:px-4 lg:gap-8 lg:px-8 hover:cursor-pointer">
              {
                subDetails.map((detail: any, index:number) => {
                  let className: string
                  if (detail.isActive) {
                    className = "row-span-1  text-lg textPrimary font-bold mx-auto md:text-2xl lg:text-4xl "
                  } else {
                    className = "row-span-1  text-lg textSecondary font-bold mx-auto md:text-2xl lg:text-4xl"
                  }
                  return (
                    <div key={index} className={className}
                    onClick={() => handleClickDetails(index)}>
                      {detail.name}
                    </div>
                  )
                })
              }
            </div>
            <div className="row-span-1 grid grid-cols-4 gap-2 px-2 md:gap-4 md:px-4 lg:gap-8 lg:px-8">
              {
                subDetails.map((detail: any, index:number) => {
                  let className: string
                  if (detail.isActive) {
                    className = "row-span-1 h-1 bg-slate-500"
                  } else {
                    className = "row-span-1 bg-transparent"
                  }
                  return (
                    <div key={index} className={className}></div>
                  )
                })
              }
            </div>
          </div>
          <div className="row-span-6">
            { isLoading ? <div>Loading...</div> : 
                subDetails[0].isActive ?
                <About abouts={pokeData.about}/> :
                  subDetails[1].isActive ? 
                  <BaseStats stats={pokeData.statistic} /> :
                    subDetails[2].isActive ?
                    <Evolution pokemon={pokeData}/> :
                    <Moves moves={pokeData.moves}/>
            }
          </div>
        </div>
      </div>
    }
    </>
  )
}

export default PokemonDetail