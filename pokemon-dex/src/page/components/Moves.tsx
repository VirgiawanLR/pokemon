import React, { useEffect, useState } from 'react'
import PokemonMoves from '../../iface/pokemon/PokemonMoves'
import { getMove } from '../../helper/apiCall'
import Pagination from './Pagination'

interface PokeMove {
  moves: PokemonMoves[]
}

const Moves: React.FC<PokeMove> = ({moves}) => {
  const [isMoveLoading, setIsMoveLoading] = useState<boolean>()
  const [page, setPage] = useState<number>(1);
  const [moveState, setMoveState] = useState<PokemonMoves[]>([])
  const [count] = useState<number>(moves.length)
  const limit: number = 10

  const fetchMoves: () => void = async () => {
    setIsMoveLoading(true)
    let startIdx:number = (page - 1) * limit
    let endIdx: number = (page*limit) - 1
    let movesSlice: PokemonMoves[]
    if (startIdx >= moves.length) {
      return;
    } else {
      movesSlice  = moves.slice(startIdx, endIdx)
    }

    let poke : PokemonMoves[] = await Promise.all(
      movesSlice.map(async (move:PokemonMoves) => {
        try {
          const fetchedMove = await getMove(move.url)
          const name: string = move.name
          const type: string = fetchedMove.type.name
          const accuracy: number = fetchedMove.accuracy
          const power: number = fetchedMove.power
          return {
            name, type, accuracy, power,
            url: move.url,
            lvl_learnt: move.lvl_learnt
          }
        } catch (error) {
          console.error(error)
          return move;
        }
      })
    )
    setMoveState(poke)
    setIsMoveLoading(false)
  }

  useEffect(() => {
    fetchMoves()
  }, [])

  useEffect(() => {
    fetchMoves()
  }, [page])

  return (
    <>
    { isMoveLoading ? <div>Loading ...</div> :
    <div className="overflow-y-auto h-full">
      <div className="h-fit bg-mainBg overflow-y-auto px-2 md:px-6  
        lg:px-10 pb-4">
        {moveState.map((move: PokemonMoves, index:number) => {
          return (
            <div className="grid grid-cols-4 text-white text-base md:text-2xl lg:text-4xl xl:text:5xl my-4 h-fit" key={index} >
              <div className=" col-span-1 textSecondary my-auto font-semibold">{move.name}</div>
              <div className={`col-span-3 font-bold my-auto h-fit overflow-hidden rounded-xl ${move.type}`}
              >
                <div className="grid grid-cols-4 text-base pl-4 py-2 gap-2">
                  {Object.keys(move).map((key) => {
                    const typedKey = key as keyof PokemonMoves
                    if (key == "url" || key == "name") return <></>

                    return (
                      <div className="grid grid-rows-2 w-fit md:text-xl lg:text-3xl xl:text:4xl">
                        <div className="row-span-1 mx-auto">{
                          key == "lvl_learnt" ? "at level" : typedKey
                        }</div>
                        <div className="row-span-1 mx-auto">{
                        move[typedKey] ? 
                          move[typedKey] : 
                          key == "lvl_learnt" ? 0 : "-"
                        }</div>
                      </div>
                    )
                  })}
                  </div>
              </div>
            </div>
          )
        })}
        <Pagination page={page} setPage={setPage} limit={limit} count={count}/>
      </div>
    </div>
    }
    </>
  )
}

export default Moves