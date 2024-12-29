import React from "react";
import { PaginationIface } from "../../iface/general/PokemonCard";

const Pagination: React.FC<PaginationIface> = ({page, setPage, limit, count}) => {

  const prevBtnOnClick: () => void = () => {
    if (page > 1) setPage(page - 1)
  }

  const nextBtnClick: () => void = () => {
    setPage(page + 1)
  }

  return (
    <div className=" row-span-1 w-full">
      <div className="flex flex-col items-center my-auto">
        {/* <!-- Help text --> */}
        <span className="text-xl text-gray-900">
          Showing{" "}
          <span className="text-black font-extrabold">{(page - 1)*limit + 1}</span>{" "}
          to{" "}
          <span className="text-black font-extrabold">
            {page*limit}
          </span>{" "}
          of{" "}
          <span className="text-black font-extrabold">
            {count}
          </span>{" "}
          Entries
        </span>
        <div className="inline-flex gap-1 mt-2 xs:mt-0 text-lg lg:gap-4">
          {/* <!-- Buttons --> */}
          <button
          disabled = {page <= 1} 
          onClick={prevBtnOnClick} 
          className="flex items-center justify-center px-4 py-1 h-fit font-medium text-white bg-black rounded-3xl hover:bg-gray-900">
            <svg
              className="w-3.5 h-3.5 me-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 5H1m0 0 4 4M1 5l4-4"
              />
            </svg>
            Prev
          </button>
          <button 
          onClick={nextBtnClick}
          className="flex items-center justify-center px-4 py-1 h-fit font-medium text-white bg-black rounded-3xl border-0 border-s border-gray-700 hover:bg-gray-900">
            Next
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
