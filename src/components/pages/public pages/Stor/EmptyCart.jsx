import React from 'react';
import { ShoppingCart } from 'lucide-react'; // אייקון חינמי ועדכני

 function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center animate-fade-in">
      <div className="max-w-md w-full">
        <div className="flex justify-center mb-6">
          <ShoppingCart className="w-20 h-20 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">עגלת הקניות ריקה</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          נראה שלא הוספת מוצרים לעגלה עדיין. בוא נתחיל לשוטט!
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
        onClick={() => document.querySelector("#cart_modal").close()}>

          סגור
        </button>
      </div>
    </div>
  );
}
export default EmptyCart