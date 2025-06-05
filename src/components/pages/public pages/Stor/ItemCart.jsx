import React, { useContext } from "react";
import { ActionContext } from "../../../Context/GlobalContext";

function ItemCart({ item }) {
  console.log(item._id.product_name, "item in cart xxx");
  const { addToCart, removeFromCart, removeProduct } = useContext(ActionContext);

  // Mobile Card Layout
  const MobileCard = () => (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
      <div className="flex gap-3">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={item.product_image ? item.product_image : item._id.product_image}
            className="w-16 h-16 object-cover rounded-lg"
            alt="item"
          />
        </div>
        
        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">
            {item.product_name ? item.product_name : item._id.product_name}
          </h3>
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
            {item.product_details ? item.product_details : item._id.product_details || "ללא פירוט"}
          </p>
        </div>
      </div>
      
      {/* Quantity Controls - שורה שנייה */}
      <div className="mt-3">
        <div className="text-center">
          <span className="text-sm text-gray-600 mb-2 block">כמות</span>
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => removeFromCart(item)}
              className="inline-flex items-center justify-center p-1 text-sm font-medium h-8 w-8 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
              type="button"
            >
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
            
            <span className="bg-gray-50 w-12 border border-gray-300 text-gray-900 text-sm rounded-lg px-2 py-1 text-center font-medium">
              {item.quantity}
            </span>
            
            <button
              onClick={() => addToCart(item)}
              className="inline-flex items-center justify-center h-8 w-8 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
              type="button"
            >
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
        </div>
      </div>

      {/* Price and Remove Button - שורה שלישית */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="text-center mb-2">
          <div className="font-semibold text-gray-900 text-lg">
            ₪{Number((item.product_costumer_price ? item.product_costumer_price : item._id.product_costumer_price) * item.quantity)}
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={() => removeProduct(item._id)}
            className="text-red-600 hover:text-red-800 text-sm font-medium hover:underline"
          >
            הסר מוצר
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Table Row - נראה רק על דסקטופ */}
      <tr className="hidden md:table-row bg-white border-b hover:bg-gray-50">
        <td className="px-2 py-4 text-center align-middle">
          <img
            src={item.product_image ? item.product_image : item._id.product_image}
            className="w-20 h-20 object-cover rounded-lg mx-auto"
            alt="item"
          />
        </td>
        <td className="px-2 py-4 text-center align-middle">
          <div className="break-words font-semibold text-gray-900 leading-tight text-sm">
            {item.product_name ? item.product_name : item._id.product_name}
          </div>
        </td>
        <td className="px-2 py-4 text-center align-middle">
          <div className="break-words font-semibold text-gray-900 leading-tight text-sm">
            {item.product_details ? item.product_details : item._id.product_details || "ללא פירוט"}
          </div>
        </td>
        <td className="px-2 py-4 text-center align-middle">
          <div className="flex items-center justify-center gap-1">
            <button
              onClick={() => removeFromCart(item)}
              className="inline-flex items-center justify-center text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 transition-colors"
              type="button"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
              </svg>
            </button>
            
            <span className="bg-gray-50 w-8 text-center text-gray-900 text-sm font-medium py-1">
              {item.quantity}
            </span>
            
            <button
              onClick={() => addToCart(item)}
              className="inline-flex items-center justify-center h-6 w-6 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 transition-colors"
              type="button"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
              </svg>
            </button>
          </div>
        </td>
        <td className="px-2 py-4 text-center align-middle">
          <div className="font-semibold text-gray-900 text-xl">
            ₪ {Number((item.product_costumer_price ? item.product_costumer_price : item._id.product_costumer_price) * item.quantity)}
          </div>
        </td>
        <td className="px-2 py-4 text-center align-middle">
          <button 
            onClick={() => removeProduct(item._id)}
            className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors p-1"
          >
            הסר
          </button>
        </td>
      </tr>

      {/* Mobile Card Layout - נראה רק על מובייל */}
      <div className="md:hidden">
        <MobileCard />
      </div>
    </>
  );
}

export default ItemCart;