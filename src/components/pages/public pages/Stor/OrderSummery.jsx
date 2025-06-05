import React, { useState, useContext, useEffect } from 'react';
import { ActionContext } from "../../../Context/GlobalContext";
import axios from 'axios';
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from '../../../Context/AuthGlobalContext';
import { Link, useNavigate } from 'react-router-dom';

const OrderSummaryPage = () => {
  const { addToCart, cart } = useContext(ActionContext);
  const { user, isAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["update_user_address"],
    mutationFn: async () => await axios.post(`/Users/updateUser/${user?._id}`, formData),
    onSuccess: (data) => {
      console.log(data);
      if (data.status === 200) {
        console.log("פרטים אישיים עודכנו בהצלחה");
      } else {
        console.log("הייתה בעיה בעדכון הפרטים ");
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // תמיד יוצרים state ריק בהתחלה
  const [order, setOrder] = useState({
    order_status: "חדש",
    order_shipment_address: {
      city: "",
      street: "",
      building_number: "",
      aprtmernt_number: "",
      postal_code: "",
    },
    order_costumer_phone: "",
    order_total_price: 0,
    order_isPaid: false,
    order_products: [],
    order_shipment_Note: "",
    order_NotRegisterPersone:"",
    order_user:user?._id,
    order_costumer_mail:user?.user_email||""
  });

  const [formData, setFormData] = useState({
    city: "",
    street: "",
    building_number: "",
    aprtmernt_number: "",
    phone: "",
    postal_code: "",
    shipment_note: "",
    NotRegisterPersone:"",
    costumer_mail:user?.user_email||""

  });

  const [ifDisabled, setifDisabled] = useState(true);
  const [note, setnote] = useState(false);
  // משתנה חדש כדי לעקוב אחרי האם המשתמש לחץ על כפתור התשלום
  const [proceedToPayment, setProceedToPayment] = useState(false);
  // משתנה חדש כדי לאחסן שגיאות טלפון
        const [phoneError, setPhoneError] = useState('');
  
  // עדכון ה-state לפי המשתמש המחובר - כאשר יש שינוי ב-isAuth או user
  useEffect(() => {
    if (isAuth && user) {
      setFormData({
        city: user.user_address?.user_city || "",
        street: user.user_address?.user_street || "",
        building_number: user.user_address?.user_Bilding_number || "",
        aprtmernt_number: user.user_address?.user_apartment_number || "",
        phone: user.user_phone_number || "",
        postal_code: user.user_address?.user_postal_code || "",
        shipment_note: "",
        NotRegisterPersone:"",
        costumer_mail:user.user_email||""


      });

      setOrder(prev => ({
        ...prev,
        order_shipment_address: {
          city: user.user_address?.user_city || "",
          street: user.user_address?.user_street || "",
          building_number: user.user_address?.user_Bilding_number || "",
          aprtmernt_number: user.user_address?.user_apartment_number || "",
          postal_code: user.user_address?.user_postal_code || "",
        },
        order_costumer_phone: user.user_phone_number || "",
        order_user:user?._id||"",
        order_costumer_mail:user?.user_email||""


      }));

      // תבדוק אם יש מספיק מידע בכתובת כדי לא להראות את טופס העריכה
      setIsEditingAddress(!user.user_address?.user_city||!user.user_address?.user_street
        || !user.user_address?.user_Bilding_number || !user.user_phone_number || !user.user_address?.user_postal_code
      );
    } else {
      // המשתמש אינו מחובר - נאפס את כל הנתונים
      resetFormAndOrder();
    }
  }, [isAuth, user]);

  // פונקציה לאיפוס הטופס וההזמנה
  const resetFormAndOrder = () => {
    setFormData({
      city: "",
      street: "",
      building_number: "",
      aprtmernt_number: "",
      phone: "",
      postal_code: "",
      shipment_note: "",
      NotRegisterPersone:"",
      costumer_mail:user?.user_email||""

    });

    setOrder({
      order_status: "חדש",
      order_shipment_address: {
        city: "",
        street: "",
        building_number: "",
        aprtmernt_number: "",
        postal_code: "",
      },
      order_costumer_phone: "",
      order_total_price: 0,
      order_isPaid: false,
      order_products: [],
      order_shipment_Note: "",
      order_NotRegisterPersone:"",
      order_user:user?._id,
      order_costumer_mail:user?.user_email||""


    });

    setIsEditingAddress(true);
  };

  const [isEditingAddress, setIsEditingAddress] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  // בדיקה אם יש פריטים בעגלה
  useEffect(() => {
    const storedCartString = localStorage.getItem('cart');
    // נווט רק אם אין פריטים בעגלה
    if ((!cart || cart.length === 0) && 
        (!storedCartString || JSON.parse(storedCartString || '[]').length === 0)) {
      navigate("/"); // ניווט לדף הבית אם אין פריטים בעגלה
    }
  }, [cart, navigate]);

  useEffect(()=>{
    if(formData.city && formData.street && formData.building_number && formData.phone && formData.postal_code
      &&formData.costumer_mail
    ) {
      setifDisabled(false);
    } else {
      setifDisabled(true);
    }
  }, [formData]);

  // useEffect חדש לטיפול בניווט לדף התשלום
  useEffect(() => {
    // בודק אם המשתמש לחץ על כפתור התשלום (proceedToPayment) ושיש לו כתובת משלוח מתאימה
    if (proceedToPayment && order.order_shipment_address.city && order.order_shipment_address.street) {
      navigate('/payment', { state: order });
      // מאפס את המשתנה כדי למנוע ניווטים נוספים אם ה-component מתעדכן
      setProceedToPayment(false);
    }
  }, [proceedToPayment, order, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  if (name === 'phone') {
      // RegEx לדוגמה עבור מספר טלפון ישראלי (10 ספרות, מתחיל ב-05)
      // ניתן לשנות את ה-RegEx הזה לפי הפורמט הרצוי
      const phoneRegex = /^05\d{8}$/; 

      if (value === '' || phoneRegex.test(value)) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
        setPhoneError(''); // מנקה שגיאות אם הקלט תקין
      } else {
        setPhoneError('מספר הטלפון אינו תקין. אנא הזן 10 ספרות המתחילות ב-  05 ואין צורך לשים -  (מקף) באמצע');
        // עדיין מעדכן את ה-formData כדי שהמשתמש יראה את מה שהקליד
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmitAddress = (e) => {
    if (e) e.preventDefault();
    
    // Basic validation
    if (!formData.city || !formData.street || !formData.building_number || !formData.phone) {
      alert("יש למלא את כל שדות החובה");
      return;
    }
    
    if (isAuth && user) {
      mutate();
    }

    setOrder({
      ...order,
      order_shipment_address: {
        city: formData.city,
        street: formData.street,
        building_number: formData.building_number,
        aprtmernt_number: formData.aprtmernt_number,
        postal_code: formData.postal_code,
      },
      order_costumer_phone: formData.phone,
      order_shipment_Note: formData.shipment_note,
      order_NotRegisterPersone: formData.NotRegisterPersone,
      order_user:user?._id,
      order_costumer_mail:formData.costumer_mail


    });

    setIsEditingAddress(false);
  };

  const handlePayment = () => {
    // עדכון ה-state של ההזמנה
    setOrder(prevOrder => ({
      ...prevOrder,
      order_isPaid: true,
      order_shipment_Note: formData.shipment_note,
      order_shipment_address: {
        city: formData.city,
        street: formData.street,
        building_number: formData.building_number,
        aprtmernt_number: formData.aprtmernt_number,
        postal_code: formData.postal_code,
      },
      order_costumer_phone: formData.phone,
      order_NotRegisterPersone: formData.NotRegisterPersone,
      order_user:user?._id,
      order_costumer_mail:formData.costumer_mail

      

    }));
    
    // מסמן שיש לבצע מעבר לעמוד התשלום
    setProceedToPayment(true);
  };

  // חישוב סה"כ מחיר
  useEffect(() => {
    const totalPrice = cart.reduce((sum, product) => {
      const price = 
        typeof product.product_costumer_price === 'number'
          ? product.product_costumer_price
          : product._id?.product_costumer_price || 0;
  
      return sum + (price * product.quantity);
    }, 0);
  
    setTotalPrice(totalPrice);
    
    setOrder(prevOrder => ({
      ...prevOrder,
      order_products: cart,
      order_total_price: totalPrice
    }));
  }, [cart]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4 md:p-8 font-sans" dir="rtl">
      <div className="max-w-4xl mx-auto w-full bg-white rounded-lg shadow p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">סיכום הזמנה</h1>
        
        {/* Products list */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">פריטים בהזמנה</h2>
          <div className="space-y-4">
            {cart.map((product, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-3">
                <div className="flex-1">
                  <p className="font-medium">{product.product_name || product._id?.product_name}</p>
                  <p className="text-gray-600">כמות: {product.quantity}</p>
                </div>
                <p className="font-semibold">
                  {(product.product_costumer_price || product._id?.product_costumer_price) * product.quantity} ₪
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xl font-bold flex justify-between border-t pt-3">
            <span>סה"כ לתשלום:</span>
            <span>{totalPrice} ₪</span>
          </div>
        </div>

        {/* Shipping details */}
        {!isEditingAddress && order.order_shipment_address.city ? (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">פרטי משלוח</h2>
            {isAuth ? (
              <p><span className="font-medium mb-3.5 text-blue-700">
                פרטי המשלוח שהזנת בעבר, אם הפרטים לא נכונים ניתן לערוך אותם
              </span></p>
            ) : (
              <p><span className="font-medium mb-3.5 text-blue-700">
                פרטי המשלוח שהזנת, אם הפרטים לא נכונים ניתן לערוך אותם
              </span></p>
            )}

            <div className="bg-gray-50 p-4 rounded-md">
              <p><span className="font-medium">עיר:</span> {order.order_shipment_address.city}</p>
              <p><span className="font-medium">רחוב:</span> {order.order_shipment_address.street}</p>
              <p><span className="font-medium">מס' בניין:</span> {order.order_shipment_address.building_number}</p>
              <p><span className="font-medium">מס' דירה:</span> {order.order_shipment_address.aprtmernt_number}</p>
              <p><span className="font-medium">מיקוד:</span> {order.order_shipment_address.postal_code}</p>
              <p><span className="font-medium">טלפון:</span> {order.order_costumer_phone}</p>
              <p><span className="font-medium">אימייל:</span> {order.order_costumer_mail}</p>
              <button 
                onClick={() => setIsEditingAddress(true)}
                className="mt-3 text-blue-600 hover:text-blue-800 font-medium"
              >
                ערוך פרטים
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">פרטי משלוח</h2>
            <div className="space-y-4">
            {ifDisabled && (<p className='text-red-700'>יש למלא את כל שדות החובה</p>)}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {
                  !isAuth && (<div>
                    <label htmlFor="NotRegisterPersone" className="block text-gray-700 mb-1">לכבוד*</label>
                    <input
                      type="text"
                      id="NotRegisterPersone"
                      name="NotRegisterPersone"
                      value={formData.NotRegisterPersone}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  )
                  
                }
             
                <div>
                  <label htmlFor="city" className="block text-gray-700 mb-1">עיר*</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="street" className="block text-gray-700 mb-1">רחוב*</label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="building_number" className="block text-gray-700 mb-1">מס' בניין*</label>
                  <input
                    type="text"
                    id="building_number"
                    name="building_number"
                    value={formData.building_number}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="aprtmernt_number" className="block text-gray-700 mb-1">מס' דירה</label>
                  <input
                    type="text"
                    id="aprtmernt_number"
                    name="aprtmernt_number"
                    value={formData.aprtmernt_number}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="postal_code" className="block text-gray-700 mb-1">מיקוד*</label>
                  <input
                    type="text"
                    id="postal_code"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div >
                  <label htmlFor="phone" className="block text-gray-700 mb-1">טלפון*</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                    <label htmlFor="costumer_mail" className="block text-gray-700 mb-1">אימייל*</label>
                    <input
                      type="text"
                      id="costumer_mail"
                      name="costumer_mail"
                      value={formData.costumer_mail}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
              </div>
              {isAuth && (
                <button
                  onClick={handleSubmitAddress}
                  disabled={ifDisabled || phoneError !== ''} 
                  className={`px-6 py-2 rounded-md hover:bg-blue-700 transition-colors w-full md:w-auto ${ifDisabled
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 transition-colors"}`}
                >
                  שמור פרטי משלוח
                </button>
              )}
             
              {!isAuth && (
                <div className="mt-4 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-800">
                    הנך מבצע רכישה כאורח. 
                    <Link to="/Login" className="text-blue-600 font-medium hover:underline mr-1">
                      התחבר למערכת
                    </Link>
                    כדי לשמור את פרטי המשלוח שלך לרכישות עתידיות.
                  </p>
                </div>
              )}
            </div>
          {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}

          </div>
          
        )}

        {/* Shipping notes */}
        <div className="mb-8">
          <label htmlFor="shipment_note" className="block text-gray-700 mb-1">הערות למשלוח</label>
          <textarea
            id="shipment_note"
            name="shipment_note"
            value={formData.shipment_note || ""}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
          />
        </div>

        {/* Payment button */}
        <div className="mt-8">
          <button
            onClick={handlePayment}
            disabled={ifDisabled}
            className={`w-full py-3 px-6 text-lg font-semibold rounded-md ${
              order.order_isPaid 
                ? "bg-green-500 text-white cursor-not-allowed" 
                : ifDisabled
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            }`}
          >
            עבור לתשלום
          </button>
          {!order.order_isPaid && (
            <p className="text-sm text-gray-600 mt-2 text-center">
              לחיצה על כפתור זה תעביר אותך לדף התשלום המאובטח
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryPage;