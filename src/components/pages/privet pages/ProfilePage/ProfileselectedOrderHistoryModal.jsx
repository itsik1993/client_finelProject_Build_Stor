// ב-UsereditObjectHistoryModal.js:
import React, { useState, useEffect, useContext } from 'react';
import { ActionContext } from '../../../Context/GlobalContext'


function UsereditObjectHistoryModal() {
  const { editObject,setEditObject } = useContext(ActionContext);
  
  console.log(editObject?.order,"רציני?")

//   useEffect(()=>{
//   console.log(editObject,"רציני?")
    
//   },[editObject])

  // if (!editObject) {
  //   return (
  //     <dialog id="ProfileeditObjectHistory_Modal" className="modal">
  //       <div className="modal-box">
  //         <h3 className="font-bold text-lg">טוען...</h3>
  //       </div>
  //     </dialog>
  //   );
  // }

  return (
    <dialog id="ProfileeditObjectHistory_Modal"className="modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-3xl h-[90vh] overflow-y-auto" dir='rtl'>
      <div className="modal-box w-11/12 max-w-5xl mr-8">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
               onClick={() => {
              document.getElementById("ProfileeditObjectHistory_Modal").close();
              setEditObject(null);
            }}
            >
            ✕
            </button>
        </form>
        
        <h3 className="font-bold text-lg mb-4 mt-10">פרטי הזמנה: {editObject?.order?._id}</h3>
        
        <div className="mb-4">
          <p><strong>תאריך הזמנה:</strong> {new Date(editObject?.order?.createdAt).toLocaleDateString('he-IL')}</p>
          <p><strong>סטטוס:</strong> {editObject?.order?.order_status}</p>
          <p><strong> סה"כ הזמנה:</strong> ₪{editObject?.order?.order_total_price}</p>
          <p><strong> הערות להזמנה:</strong> {editObject?.order?.order_shipment_Note}</p>
          <p><strong>  כתובת למשלוח:</strong>

           {" רחוב:    "}{editObject?.order?.order_shipment_address?.street +" "+editObject?.order?.order_shipment_address?.building_number}
           {" , "}{editObject?.order?.order_shipment_address?.city}
           {" , דירה: "}{editObject?.order?.order_shipment_address?.aprtmernt_number?editObject?.order?.order_shipment_address.aprtmernt_number:""}
           {" , מיקוד: "}{editObject?.order?.order_shipment_address?.user_postal_code?editObject?.order?.order_shipment_address.user_postal_code:""}
           </p>
        </div>

        {/* רשימת הפריטים */}
        <div>
          <h4 className="font-semibold text-lg mb-2">פריטים בהזמנה:</h4>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>שם המוצר</th>
                  <th>כמות</th>
                  <th>מחיר יחידה</th>
                  <th>מחיר כולל למוצר</th>
                  <th>תמונה</th>
                </tr>
              </thead>
              <tbody >
                {editObject?.order?.order_products?.map((item, idx) => (
                  <tr key={idx} className='mb-10'>
                    <td className='text-center'>{item._id?.product_name }</td>
                    <td className='text-center'>{item.order_quantity}</td>
                    <td className='text-center'>₪{item._id?.product_costumer_price}</td>
                    <td className='text-center'>₪{item.order_quantity * item._id?.product_costumer_price}</td>
                    <td className='flex justify-center'>
                      <img className="h-[48px] w-[80px] " src={item._id?.product_image} alt="" />
                      
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default UsereditObjectHistoryModal;