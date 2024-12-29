import React from 'react'
import PokemonStatistics from '../../iface/pokemon/PokemonStatistics'

interface BaseStatsIface {
  stats: PokemonStatistics[]
}

const colors: string[] = ["grass", "fire", "water", "ground", "electric", "ice"]

const BaseStats: React.FC<BaseStatsIface> = ({stats}) => {
  return (
    <div className={`bg-mainBg grid grid-rows-${stats.length} overflow-hidden
    px-8 gap-4 md:px-12 md:gap-8 lg:px-16 lg:gap-12 text-lg md:text-2xl lg:text-4xl
    py-4`}>
      {stats.map((stat: PokemonStatistics, index:number) => {
        const compare: number = stat.base_stat ? stat.base_stat/3 : 0 
        return (
        <div className="row-span-2 grid grid-cols-6 textSecondary" key={index}>
          <div className=" col-span-2 ">{
            stat.name.includes("special") ? `sp. ${stat.name.split("-")[1]}` : 
            stat.name
            }
          </div>
          <div className=" col-span-1 font-bold textPrimary">{stat.base_stat}</div>
          <div className=" col-span-3 h-1 md:h-3 bg-slate-200 my-auto">
            <hr className={`${colors[index]} h-1 md:h-3`} style={{
              width: `${compare}%`
            }} />
          </div>
        </div>
      )})}
    </div>
  )
}

export default BaseStats