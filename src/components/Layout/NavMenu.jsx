import React from 'react'
import { NavLink } from 'react-router-dom';
import{AuthContext} from "../Context/AuthGlobalContext"
import { useContext, useEffect,useState } from 'react'
import { IoCart } from "react-icons/io5"
import { ActionContext } from "../Context/GlobalContext";
import { ShoppingBag, Star, ArrowRight, X, Heart, Search, User, Truck, Shield, Award, Phone } from 'lucide-react';




function Menu({setOpen}) {

const{ isAuth ,logOut } = useContext(AuthContext)
const {totalProducts,setTotalProducts,setCart } = useContext(ActionContext);

const [menu, setMenu] = useState(isAuth)
useEffect(() => {
  setMenu(isAuth)
  
  if(!isAuth) {
    if(localStorage.getItem('cart'))
    {
      console.log("there is a cart in the local storage")
      setCart(JSON.parse(localStorage.getItem('cart')))
    }
    else{
      setTotalProducts(0)
      setCart([])
    }
   
  }
  
}, [isAuth])
    
  function navActive({ isActive }) {
    return `block py-2 px-3 ${
      isActive ? "dark:text-blue-700" : "dark:text-white"
    } text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`;
  }

  return (
    <ul className="flex flex-col  p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

      <li className='mt-3'>
        <NavLink onClick={() => setOpen && setOpen(false)} to="/" className={navActive}>
          דף הבית
        </NavLink>
      </li>
      <li className='mt-3'>
        <NavLink onClick={() => setOpen && setOpen(false)} className={navActive} to="/Store">
          חנות
        </NavLink>
      </li>
      
      {/* { 
      isAuth && (
        <li className='mt-3'>
        <NavLink onClick={() => setOpen && setOpen(false)} className={navActive} to="/User/Orders">
          ההזמנות שלי
        </NavLink>
      </li>
      )

      } */}
     
      <li className='mt-3'>
        <NavLink onClick={() => setOpen && setOpen(false)} to="/Contact" className={navActive}>
          צור קשר
        </NavLink>
      </li>
      {
        isAuth && (
          <li className='mt-3'>
          <NavLink onClick={() => setOpen && setOpen(false)} to="/User/Profile" className={navActive}>
            פרופיל
          </NavLink>
          </li>  
          )
      }
      <li className='mr-20'>
      <div className="flex gap-5 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            onClick={() => document.querySelector("#cart_modal").showModal()}
            type="button"
            className="focus:outline-none relative text-white bg-gray-200 hover:bg-purple-800 
          focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600
           dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
             <ShoppingBag className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors duration-200" />
                <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {totalProducts}

                </span>
            {/* <IoCart size={18} />
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-blue-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
              {totalProducts}
            </div> */}
          </button>
          </div>
      </li>
           {
        !isAuth ? (
          <li className='mt-3'>
        <NavLink onClick={() => setOpen && setOpen(false)} to="/Login" className={navActive} aria-current="page">
        <button
            type="button"
            className="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            
          >
          כניסה
          </button>
        </NavLink>
      </li>
          ):
          <li className='mt-3'>
         <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={logOut }
          >
           <a>התנתק</a> 
          </button>
          </li>
      }


   
    </ul>
  )

}

export default Menu