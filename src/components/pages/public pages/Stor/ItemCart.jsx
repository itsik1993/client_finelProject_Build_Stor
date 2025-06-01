import React, { useContext } from "react";
import { ActionContext } from "../../../Context/GlobalContext";
//
function ItemCart({ item }) {

  console.log(item._id.product_name, "item in cart xxx");
   const { addToCart , removeFromCart , removeProduct } = useContext(ActionContext);
  return (
    <tbody>
      <tr className="bg-white border-b  hover:bg-gray-50 ">
        <td className="p-4">
          <img
            src={item.product_image?item.product_image:item._id.product_image}
            className="w-16 md:w-32 max-w-full max-h-full"
            alt="item"
          />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 ">{item.product_name?item.product_name:item._id.product_name}</td>
        <td className="px-6 py-4 font-semibold text-gray-900 ">  {item.product_details?item.product_details:item._id.product_details || "ללא פירוט"}
        </td>
        
        <td className="px-6 py-4">
          <div className="flex items-center">
            {/* Decrese Quantity */}
            <button
            onClick={() => removeFromCart(item)}
              className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
            >
              <span className="sr-only">reduse Quantity button</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
            <div>
              <input
                type="number"
                id="first_product"
                value={item.quantity}
                className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            {/* Add Quantity Btn */}
            <button
            onClick={() => addToCart(item)}
              className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
            >
              <span className="sr-only">add Quantity button</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 ">
          {Number(item.product_costumer_price?item.product_costumer_price:item._id.product_costumer_price * item.quantity)}
        </td>
        <td onClick={() => removeProduct(item._id)} className="px-6 py-4">
          <a className="font-medium text-red-600  hover:underline cursor-pointer">
            הסר מוצר
          </a>
        </td>
      </tr>
    </tbody>
  );
}

export default ItemCart;
