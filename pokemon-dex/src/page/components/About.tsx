import React from 'react'
import { PokemonAbout } from '../../iface/pokemon/PokemonStatistics'
import { decimetersToInches, hectogramsToLbs } from '../../utils/util/stringUtil'

interface AboutIface {
  abouts: PokemonAbout[]
}

const About: React.FC<AboutIface> = ({abouts}) => {
  return (
    <div className="bg-mainBg grid grid-rows-4 overflow-hidden
    px-8 gap-8 md:px-12 md:gap-12 lg:px-16 lg:gap-20 text-xl md:text-2xl lg:text-4xl
    py-4">
      {abouts.map((about: PokemonAbout, index:number) => {
        return (
          <div className="row-span-1 grid grid-cols-3" key={index}>
            <div className=" col-span-1 textSecondary">{about.name}</div>
            <div className=" col-span-2 font-bold textPrimary">
              { about.details == "" || about.details == null ?
                "No Data" :
                about.name == "Weight" ?
                  `${hectogramsToLbs(parseInt(about.details))} lbs (${parseInt(about.details)/10} kg)` :
                  about.name == "Height" ?
                    `${decimetersToInches(parseInt(about.details))} inches (${parseInt(about.details)*10} cm)`
                    : about.details
              }
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default About