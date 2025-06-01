import React, { useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { AuthContext } from '../../../Context/AuthGlobalContext';

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderId } = location.state || {};
  const { user, isAuth } = useContext(AuthContext);
const GoToPage={
  page:"orders"
}
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4 md:p-8 font-sans" dir="rtl">
      <div className="max-w-lg mx-auto w-full bg-white rounded-lg shadow p-6 md:p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle size={64} className="text-green-500" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">ההזמנה התקבלה בהצלחה!</h1>
        
        <p className="text-gray-600 mb-6">
          תודה על הזמנתך. אנחנו מתחילים לטפל בהזמנה מיד.
          {orderId && <span className="block mt-2">מספר הזמנה: {orderId}</span>}
        </p>
        
        <p className="text-gray-600 mb-8">
          קיבלת אישור על הזמנתך בדוא"ל.
          נעדכן אותך כאשר ההזמנה תישלח.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            המשך לדף הבית
          </Link>
          {
            isAuth&&user&&(
                <Link 
                to="/User/Profile" 
                 state={GoToPage}
                className="bg-gray-200 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-300 transition-colors"
              >
                צפה בהזמנות שלי
              </Link>
            )
          }
        
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;