import React from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

function Pagination({ pages, setPage, page }) {
  const buttons = [];
  for (let i = 0; i < pages; i++) buttons.push(i);

function handelPrevious(){
    if(page>=2)setPage(page - 1)

}

function handelNext(){
    if(page<=pages-1)setPage(page + 1)

}

  return (
    <nav aria-label="Page navigation example w-full my-5" className="mt-5">
      <ul className="flex items-center justify-center w-full -space-x-px h-10 text-base">
        {/* Back */}
        <li>
          <a className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100
           hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
           onClick={handelPrevious}
            >
            <span className="sr-only">Previous</span>
            <IoIosArrowBack size={20} className="rtl:rotate-180" />
          </a>
        </li>
        {/* Pages */}
        {buttons.map((button) => (
          <li key={button} onClick={() => setPage(button + 1)}>
            <a
              className={`flex items-center
             cursor-pointer justify-center 
             px-4 h-10 leading-tight text-gray-500
              bg-white border border-gray-300
               hover:bg-gray-100 hover:text-gray-700
                 dark:border-gray-700
                  dark:hover:bg-gray-700
                  dark:hover:text-white ${
                    page === button + 1
                      ? "dark:text-blue-400 dark:bg-blue-800"
                      : "dark:text-gray-400 dark:bg-gray-800"
                  }`}
            >
              {button + 1}
            </a>
          </li>
        ))}
        {/* Next */}
        <li>
          <a className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg
           hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
            dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={handelNext}>
            <span className="sr-only">Next</span>
            <IoIosArrowForward size={20} className="rtl:rotate-180" />
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
