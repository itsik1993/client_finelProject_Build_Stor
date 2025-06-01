import React,{useContext,useState} from 'react'
import {AuthContext} from '../../../Context/AuthGlobalContext'
// import { useState } from "react";
import ProfileMenu from './ProfileMenu';
import PersonalDetails from './PersonalDetails';
import OrderHistory from './OrderHistory';
import WishList from './WishList';
import axios from 'axios';
import { User, Edit, ShoppingCart, Heart, Clock, Home, Phone, Mail, CheckCircle, XCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";






// const mockUser = {
//   user_firstname: "ישראל",
//   user_lastname: "ישראלי",
//   user_email: "israel@example.com",
//   user_address: {
//     user_city: "תל אביב",
//     user_street: "רוטשילד",
//     user_Bilding_number: 10,
//     user_apartment_number: 5,
//     user_postal_code: 6123001
//   },
//   user_phone_number: "0521234567",
//   user_premission: "Regular",
//   verifyEmail: true,
//   SignUpProvider: "Credential",
//   user_orders_history: [
//     { _id: "1", date: "2025-05-01", total: 120.50, status: "הושלמה" },
//     { _id: "2", date: "2025-04-15", total: 85.20, status: "נשלחה" },
//     { _id: "3", date: "2025-03-22", total: 210.75, status: "בהכנה" }
//   ],
//   user_whishlist: [
//     { _id: "101", name: "אוזניות אלחוטיות", price: 199.99, image: "/api/placeholder/80/80" },
//     { _id: "102", name: "טלפון חכם", price: 2499.00, image: "/api/placeholder/80/80" },
//     { _id: "103", name: "מקלדת גיימינג", price: 349.90, image: "/api/placeholder/80/80" }
//   ],
//   user_shopping_cart: [
//     { _id: "201", name: "מטען אלחוטי", price: 89.90, quantity: 1, image: "/api/placeholder/80/80" },
//     { _id: "202", name: "מגן מסך", price: 49.90, quantity: 2, image: "/api/placeholder/80/80" }
//   ]
// };



function Profile() {

  const {user} = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  // const [userData, setUserData] = useState(mockUser);
  console.log(user," אני בדף הפרופיל")






// שליפת הנתונים של כל המוצרים
  const { data: getUserData,
    isLoading: isgetUserLoading,
    error: getUserError,
    isError: isgetUserError
  } = useQuery({
    queryKey: ["getUser", ],
    queryFn: async () => (await axios.get(`/Users//getuser/${user._id}`)).data,
    select: ({ data }) => ({ data }),
    staleTime: 1000 * 60,
    onSuccess: (data) => {
      console.log(data, "data of the user");

    },
    onError: (err) => {
      console.log(err);
      console.log(getUserError);
    },

  });







  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };



  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name.includes(".")) {
  //     const [parent, child] = name.split(".");
  //     setUserData({
  //       ...userData,
  //       [parent]: {
  //         ...userData[parent],
  //         [child]: value
  //       }
  //     });
  //   } else {
  //     setUserData({
  //       ...userData,
  //       [name]: value
  //     });
  //   }
  // };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-right" dir="rtl">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">הפרופיל שלי</h1>
          <div className="flex items-center gap-2">
            {/* <span>{userData.user_firstname} {userData.user_lastname}</span> */}
            <span>{user.user_firstname} {user.user_lastname}</span>
            <User className="h-6 w-6" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex flex-col md:flex-row flex-grow p-4 gap-6">
        {/* Sidebar */}
        <ProfileMenu activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Content Area */}
        <section className="md:w-3/4 bg-white rounded-lg shadow-md p-6">
        {activeTab === "personal" && <PersonalDetails  isEditing={isEditing} setIsEditing={setIsEditing}  handleEditToggle={handleEditToggle}  />}
        {activeTab === "orders" && <OrderHistory userData={getUserData.data.user_orders_history} activeTab={activeTab}/>} 
        {  activeTab === "wishlist" && <WishList userData={getUserData.data.user_whishlist} user={user} activeTab={activeTab}/>}
         
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          {/* <p>© {new Date().getFullYear()} כל הזכויות שמורות</p> */}
        </div>
      </footer>
      
    </div>
  );
}

export default Profile