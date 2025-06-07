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
import Loading from '../../../UI/Loading';






function Profile() {

  const {user} = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  // const [userData, setUserData] = useState(mockUser);
  console.log(user," אני בדף הפרופיל")






// שליפת הנתונים של המשתמש
  const { data: getUserData,
    isLoading: isgetUserLoading,
    error: getUserError,
    isError: isgetUserError
  } = useQuery({
    queryKey: ["getUser"],
    queryFn: async () => (await axios.get(`/Users/getuser/${user._id}`)).data,
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
      { isgetUserLoading && 
        <Loading />}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">הפרופיל שלי</h1>
          <div className="flex items-center gap-2">
            {/* <span>{userData.user_firstname} {userData.user_lastname}</span> */}
            <span>{user?.user_firstname} {user?.user_lastname}</span>
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
        {activeTab === "personal" && <PersonalDetails userData={getUserData}  isEditing={isEditing} setIsEditing={setIsEditing}  handleEditToggle={handleEditToggle}  />}
        {activeTab === "orders" && <OrderHistory userData={getUserData?.data?.user_orders_history} activeTab={activeTab}/>} 
        {  activeTab === "wishlist" && <WishList userData={getUserData?.data?.user_whishlist} user={user} activeTab={activeTab}/>}
         
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