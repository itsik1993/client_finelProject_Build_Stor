import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaHeartBroken } from "react-icons/fa";
import { MdOutlineFavorite } from "react-icons/md";
import { AuthContext } from '../../../Context/AuthGlobalContext'
import { ActionContext } from "../../../Context/GlobalContext";
import { ShoppingBag, Star, ArrowRight, Menu, X, Heart, Search, User, Truck, Shield, Award, Phone,  } from 'lucide-react';


function ProductCard({ product, addToCart, cart }) {
    const { user, isAuth } = useContext(AuthContext);
       const { toggleWishlist, isInWishlist, isUpdating,wishlist} = useContext(ActionContext);
    
    const navigate = useNavigate();

    useEffect(() => {
        console.log(wishlist, "this is the cart")
    }, [wishlist])


      if (String(product.product_showInStore )=== "false") {
        return null; // אם product_showInStore הוא false, לא נציג את כרטיס המוצר כלל
    }

    return (
        
        <div onClick={() => navigate(`${product._id}`)} className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md" dir='rtl'>
                
                 {/* Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1 z-20 rounded-full text-xs font-bold ${
                    product.product_badge === 'מומלץ' ? 'bg-blue-500 text-white' :
                    product.product_badge === 'חדש' ? 'bg-green-500 text-white' :
                    product.product_badge === 'אזל' ? 'bg-red-500 text-white' :
                    'bg-purple-500 text-white'
                  }`}>
                    {product.product_badge}
                  </div>
            <a className="relative mx-3 mt-3 flex justify-center h-60 overflow-hidden rounded-xl">
                <img className="object-cover" src={product.product_image} alt="product image" />
            </a>
            <div className="mt-4 px-5 pb-5">
                <a>
                    <h5 className="text-xl tracking-tight font-bold text-slate-900">{product.product_name}</h5>
                </a>
                <div className='mt-2 mb-2 flex items-center '>
                    <span className="text-s text-slate-900 ">{product.product_description}</span>
                </div>
                {/* <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                        <span className="text-2xl font-semibold text-slate-900">  {product.product_costumer_price} ₪</span>
                    </p>
                </div> */}
                    <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900"> ₪{product.product_costumer_price}</span>
                      {product.product_originalPrice && (
                        <span className="text-gray-400 line-through mr-2 text-sm">₪{product.product_originalPrice}</span>
                      )}
                    </div>
                  </div>
                <div className="flex items-center justify-between">
             
                         <button 
                    className={`flex items-center justify-center gap-2.5 rounded-md  px-3 py-1.5 text-center text-xs font-medium hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300" ${
                      product.product_stock 
                        ? 'bg-gray-900 text-white hover:bg-gray-800' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                    
                    disabled={!product.product_stock}
                      onClick={(event) => {
                            event.stopPropagation()
                            addToCart(product)
                        }}
                  >
                     <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    {product.product_stock ? 'הוסף לסל' : 'אזל במלאי'}
                  </button>

                    {user && isAuth && (
                        <button
                            className={`flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-center text-xs font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 ${
                                isUpdating 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-slate-900 hover:bg-gray-700'
                            }`}
                            onClick={(event) => {
                                event.stopPropagation();
                                if (!isUpdating) {
                                    toggleWishlist(product._id);
                                }
                            }}
                            disabled={isUpdating}
                        >
                            {isUpdating ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    מעדכן...
                                </>
                            ) : isInWishlist(product._id) ? (
                          
                                <>
                                    <Heart className="text-red-500 mr-1  " size={20} />
                                    הסר ממועדפים
                                </>
                            ) : (
                                <>
                                    <Heart className="text-gray-500 mr-1" size={20} />
                                    הוסף למועדפים
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
      
    )

}

export default ProductCard