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
  const limit: number = 20

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
      movesSlice.map(async (move:PokemonMoves, index: number) => {
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
    <div className="overflow-y-auto">
    <div className="h-full bg-mainBg overflow-y-auto px-8 gap-8 md:px-12 md:gap-12 
      lg:px-16 lg:gap-20 text-xl md:text-2xl lg:text-4xl py-4">
      {moveState.map((move: PokemonMoves, index:number) => {
        return (
          <div className="grid grid-cols-3 text-white text-lg md:text-4xl" key={index} >
            <div className=" col-span-1 textSecondary my-auto">{move.name}</div>
            <div className={`col-span-2 font-bold my-auto h-3/4 overflow-hidden rounded-xl md:h-full ${move.type}`}
            >
              <div className="h-full w-full">
                <p className="font-extrabold md:text-6xl">{move.name}</p></div>
            </div>
          </div>
        )
      })}
    </div>
    <Pagination page={page} setPage={setPage} limit={limit} count={count}/>
    </div>
    }
    </>
  )
}

export default Moves