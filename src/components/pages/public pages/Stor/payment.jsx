import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios"
import { ActionContext } from "../../../Context/GlobalContext";
import { AuthContext } from '../../../Context/AuthGlobalContext';
import { useMutation } from "@tanstack/react-query";


function payment() {
  const { cart, setCart } = useContext(ActionContext);
  const location = useLocation();
  const navigate = useNavigate();
  const orderdata = location.state;
  const { user, isAuth } = useContext(AuthContext);

  console.log(orderdata, " this is the whole order")

  const createOrder = async (data) => {
    const sendCart = cart.map((item) => ({
      product_name: item?.product_name || item?._id.product_name,
      product_costumer_price: item.product_costumer_price || item._id.product_costumer_price,
      quantity: item.quantity,
      sku: item._id
    }))

    // ההזמנה שנשלחת לשרת , והשרת מחזיר את המזהה של ההזמנה שנוצרה בפאיפל
    const response = await axios({
      url: "/payment/create-order",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ sendCart })
    });
    console.log(response, "5454545")
    return response.data.orderId;
  };

  const onApprove = async (data) => {
    // ההאזנה להחלטתו של הלקוח נשלחת לנקודת קצה בשרת ומבצעת אישור \ ביטול
    console.log(data.orderID, "343344")
    const response = await axios({
      url: "/payment/capture-order",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ orderId: data.orderID }),
    });
    console.log(response, " תשובה")
    if (response.status === 200)
      createNewOrderMutation()
    return response.data;
  };

  const { mutate: createNewOrderMutation } = useMutation({
    mutationKey: ["create_New_Order"],
    mutationFn: async () => await axios.post(`/Orders/CreateNewOrder`, {orderdata}),
    onSuccess: (data) => {
      console.log(data);
      if (data.status === 200) {
        console.log("נוצרה הזמנה חדשה בהצלחה");
        // הכנסנו משתנה מקומי לאחסון מספר ההזמנה
        const orderId = data.data.order._id;
        console.log(orderId, "מספר ההזמנה החדש");
        
        if (isAuth && orderId) {
          // שולחים את מספר ההזמנה כאובייקט
          UpdateUserOrderMutation({ orderId: orderId });
        }
        
        // ניקוי העגלה ומעבר לדף אישור הזמנה
        setCart([]);
        localStorage.removeItem('cart');
        navigate('/order-confirmation', { state: { orderId: orderId } });
      } else {
        console.log("הייתה בעיה ביצירת ההזמנה ");
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: UpdateUserOrderMutation } = useMutation({
    mutationKey: ["update_user_newOrder"],
    // שינוי כאן - הפרמטר orderData כבר מכיל את האובייקט עם שדה orderId
    mutationFn: async (orderData) => await axios.post(`/Users/updateUser_Order/${user._id}`, orderData),
    onSuccess: (data) => {
      console.log(data);
      if (data.status === 200) {
        console.log("עדכנתי את ההזמנה אצל המשתמש ");
      } else {
        console.log(" הייתה בעיה בעדכון ההזמנה אצל המשתמש ");
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">השלם את התשלום</h2>
        <div className="mb-6">
          <p className="text-lg font-medium mb-2">סכום לתשלום: {orderdata.order_total_price} ₪</p>
          <p className="text-sm text-gray-600 mb-4">אנא השלם את התשלום באמצעות PayPal</p>
        </div>
        <PayPalButtons
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
        />
      </div>
    </div>
  )
}

export default payment