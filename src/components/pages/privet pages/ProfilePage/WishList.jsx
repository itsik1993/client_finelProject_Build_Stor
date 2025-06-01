import React, { useState, useEffect,useContext } from 'react';
import { ActionContext } from "../../../Context/GlobalContext";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import {AuthContext} from '../../../Context/AuthGlobalContext'

import axios from 'axios';

function WishList({userData,activeTab,user}) {
  const { addToCart  } = useContext(ActionContext);
  const queryClient = useQueryClient();
    const {getAuth} = useContext(AuthContext)
  


const removeFromWishlist = (itemId) => {
  console.log(itemId, "אני ברשימת המשאלות");
  // להעביר ID של המוצר
  RemoveWishList({ productId: itemId });
}

  const { mutate:RemoveWishList } = useMutation({
    mutationKey: ["remove_from_wishlist"],
    mutationFn: async (dataToSend) =>
      await axios.post(`/Users/RemoveFromWishList/${user._id}`, dataToSend),
    
    onSuccess: (data) => {
      console.log(data);
      if (data.status === 200) {
        console.log("מוצר הוסר מרשימת מועדפים");
          queryClient.invalidateQueries({ queryKey: ["getUser"] });
          // queryClient.invalidateQueries({ queryKey: ["get_products"], refetchType: "all" });
          getAuth()

        // navigate("/Login");
      } else {
        console.log("הייתה בעיה  בהסרת המועדף, נסה שוב מאוחר יותר");
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });



  console.log(userData, "אני ברשימת המשאלות")
  return (
    <div>
              <h2 className="text-xl font-bold mb-6">מוצרים שאהבתי</h2>
              {userData?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userData?.map((item) => (
                    <div key={item._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4">
                        <img src={item.product_image} alt={item.product_name} className="w-20 h-20 object-cover rounded" />
                        <div>
                          <h3 className="font-medium">{item.product_name}</h3>
                          <p className="text-blue-600 font-bold mt-1">₪{Number(item.product_costumer_price).toFixed(2)}</p>
                          <div className="mt-2 flex gap-2">
                            <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                                  onClick={() => {
                              // setQuantity(quantity + 1);
                            addToCart(item)
                        }}>
                              הוסף לעגלה
                            </button>
                            <button className="px-3 py-1 bg-red-100 text-red-600 rounded-md text-sm hover:bg-red-200"
                              onClick={() => removeFromWishlist(item._id)}>
                              הסר ממועדפים
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  <p>אין מוצרים ברשימת המשאלות שלך</p>
                </div>
              )}
            </div>
  )
}

export default WishList