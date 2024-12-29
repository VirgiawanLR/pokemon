import React from 'react'
import { PokemonTypeList } from '../../iface/general/PokemonCard'
import { Type } from '../../iface/pokemon/Pokemon'

const TypeList: React.FC<PokemonTypeList> = ({typeList, order}) => {

  return (
    <>
      { typeList != null ? (
        typeList.map((type: Type, index: number) => {
          return (
            <div className={`${order}-span-1 rounded-3xl h-fit 
            semiTransparent py-2 text-white text-center text-xl lg:text-3xl`} key={index}>
              {type.name}
            </div>
          )
        })
      ) : (
        <div>Loading...</div>
      ) 
      }
    </>
  )
}

export default TypeList