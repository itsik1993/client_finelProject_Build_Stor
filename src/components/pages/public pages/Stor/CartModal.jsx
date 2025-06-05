import React, { useContext } from "react";
import { ActionContext } from "../../../Context/GlobalContext";
import ItemCart from "../Stor/ItemCart";
import { Link } from "react-router-dom";
import EmptyCart from "./EmptyCart";  

// addToCart => Cart => CartModal => ItemCart
function CartModal() {
  const { cart, totalPrice, totalProducts, clearCart } = useContext(ActionContext);
  
  return (
    <dialog
      id="cart_modal"
      className="modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] md:w-[85vw] h-[90vh] md:h-[85vh] overflow-y-auto"
    >
      <div className="modal-box p-3 md:p-5 w-full max-w-7xl">
        <button
          onClick={() => document.querySelector("#cart_modal").close()}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10"
        >
          ✕
        </button>
        {cart.length === 0 ? (
          <div className="w-full flex justify-center items-center h-[70vh]">
            <EmptyCart /> 
          </div>
        ) : (
          <div className="w-full">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm text-gray-500 min-w-full">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-2 py-3 text-center w-20">
                      תמונה
                    </th>
                    <th scope="col" className="px-2 py-3 text-center w-32">
                      שם מוצר
                    </th>
                    <th scope="col" className="px-2 py-3 text-center  w-32">
                      תיאור מוצר
                    </th>
                    <th scope="col" className="px-2 py-3 text-center w-32">
                      כמות
                    </th>
                    <th scope="col" className="px-2 py-3 text-center w-28">
                      מחיר
                    </th>
                    <th scope="col" className="px-2 py-3 text-center w-20">
                      הסר
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, i) => (
                    <ItemCart key={i} item={item} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {cart.map((item, i) => (
                <ItemCart key={i} item={item} />
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="text-center md:text-right space-y-2">
                <div className="text-lg md:text-xl font-medium">
                  מחיר סופי: ₪{totalPrice}
                </div>
                <div className="text-lg md:text-xl font-medium">
                  סה"כ פריטים: {totalProducts}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-6">
              <Link
                onClick={() => document.querySelector("#cart_modal").close()}
                to={"/checkout"}
                className="w-full sm:w-auto text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40"
              >
                <svg
                  className="w-4 h-4 me-2 -ms-1"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="bitcoin"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M504 256c0 136.1-111 248-248 248S8 392.1 8 256 119 8 256 8s248 111 248 248zm-141.7-35.33c4.937-32.1-20.19-50.74-54.55-62.57l11.15-44.7-27.21-6.781-10.85 43.52c-7.154-1.783-14.5-3.464-21.8-5.13l10.93-43.81-27.2-6.781-11.15 44.69c-5.922-1.349-11.73-2.682-17.38-4.084l.031-.14-37.53-9.37-7.239 29.06s20.19 4.627 19.76 4.913c11.02 2.751 13.01 10.04 12.68 15.82l-12.7 50.92c.76 .194 1.744 .473 2.829 .907-.907-.225-1.876-.473-2.876-.713l-17.8 71.34c-1.349 3.348-4.767 8.37-12.47 6.464 .271 .395-19.78-4.937-19.78-4.937l-13.51 31.15 35.41 8.827c6.588 1.651 13.05 3.379 19.4 5.006l-11.26 45.21 27.18 6.781 11.15-44.73a1038 1038 0 0 0 21.69 5.627l-11.11 44.52 27.21 6.781 11.26-45.13c46.4 8.781 81.3 5.239 95.99-36.73 11.84-33.79-.589-53.28-25-65.99 17.78-4.098 31.17-15.79 34.75-39.95zm-62.18 87.18c-8.41 33.79-65.31 15.52-83.75 10.94l14.94-59.9c18.45 4.603 77.6 13.72 68.81 48.96zm8.417-87.67c-7.673 30.74-55.03 15.12-70.39 11.29l13.55-54.33c15.36 3.828 64.84 10.97 56.85 43.03z"
                  ></path>
                </svg>
                עבור לתשלום
              </Link>
              <button
                onClick={clearCart}
                type="button"
                className="w-full sm:w-auto text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                נקה עגלה
              </button>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}

export default CartModal;