import React, { useEffect } from "react";
import { useHomePage } from "../utils/hooks/useHomePage";
import PokeCards from "./components/PokeCards";
import Pagination from "./components/Pagination";

const Pokedex: React.FC = () => {
  const { pokemonList, fetchPokemons, page, setPage, limit, count, isLoading} = useHomePage();

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    fetchPokemons()
  }, [page])

  return (
    <>
      <div className="pokeball">
        <div className="button"></div>
      </div>
      <div className=" bg-mainBg maxvw maxvh grid grid-rows-12 pl-3 pr-8 pb-8 gap-0 lg:gap-4">
        <div className=" row-span-2 w-full h-fit my-auto">
          <h1
            className="p-3 pt-6 font-extrabold xl:text-8xl lg:text-7xl text-textPrimary
            md:text-6xl sm:text-5xl text-4xl my-auto"
          >
            Pokedex
          </h1>
        </div>
        <div className=" gap-6 row-span-9 w-full grid 2xl:grid-cols-4 lg:grid-cols-2 overflow-y-auto pr-3
          sm:grid-cols-2">
          <PokeCards pokemonList={pokemonList} isLoading={isLoading} />
        </div>
        <Pagination page={page} setPage={setPage} limit={limit} count={count}/>
      </div>
    </>
  );
};

export default Pokedex;
