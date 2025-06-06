import React, { useState, useEffect, useContext } from 'react';

import { ActionContext } from '../../../Context/GlobalContext'
import ProfileselectedOrderHistoryModal from './ProfileselectedOrderHistoryModal';


function OrderHistory({userData, setUserData}) {
  console.log(userData," ne")
const { openModal } = useContext(ActionContext);


  
       
  return (
    <div>
    <h2 className="text-xl font-bold mb-6">היסטוריית הזמנות</h2>
    {userData?.length> 0 ? (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-right">מס' הזמנה</th>
              <th className="border p-3 text-right">תאריך</th>
              <th className="border p-3 text-right">סה"כ</th>
              <th className="border p-3 text-right">סטטוס</th>
              <th className="border p-3 text-right">פעולות</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((order) => (
              
              <tr key={order?._id} className="hover:bg-gray-50">
                <td className="border p-3">{order?._id}</td>
                <td className="border p-3">{
        new Date(order?.createdAt).toLocaleString({
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
          </td>
                <td className="border p-3">₪{order.order_total_price.toFixed(2)}</td>
                <td className="border p-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.order_status === "הושלמה" ? "bg-green-100 text-green-800" : 
                    order.order_status === "נשלחה" ? "bg-blue-100 text-blue-800" : 
                    "bg-yellow-100 text-yellow-800"
                  }`}>
                    {order.order_status}
                  </span>
                </td>
                <td className="border p-3">
                  <button className="text-blue-600 hover:text-blue-800"
                  onClick={() => openModal({order}, "ProfileeditObjectHistory_Modal")}
                  >צפה בפרטים
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="text-center py-10 text-gray-500">
        <p>אין הזמנות קודמות</p>
      </div>
    )}
    <ProfileselectedOrderHistoryModal/>
  </div>
  )
}

export default OrderHistory