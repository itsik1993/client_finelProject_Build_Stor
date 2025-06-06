import React,{useContext,useState ,useEffect} from 'react'
import { useMutation, useQuery } from "@tanstack/react-query";
import {AuthContext} from '../../../Context/AuthGlobalContext'
import axios from "axios";
import {  Edit, ShoppingCart, Heart, Clock, Home, Phone, Mail, CheckCircle, XCircle } from "lucide-react";
import { toastSuccess, toastError } from '../../../UI/Toast';
function PersonalDetails({userData, isEditing,setIsEditing, handleEditToggle}) {


  
    const {user,setUser} = useContext(AuthContext)
      const [phoneError, setPhoneError] = useState('');
  //    const [formData, setFormData] = useState({
  //   user_firstname:user.user_firstname|| '',
  //   user_lastname:user.user_lastname|| '',
  //   user_email:user.user_email|| '',
  //   verifyEmail:user.verifyEmail||false,
  //   user_phone_number: user.user_phone_number||'',
   
  //     user_city:user.user_address?.user_city||'',
  //     user_street:user.user_address?.user_street||'',
  //     user_Bilding_number:user.user_address?.user_Bilding_number||'',
  //     user_apartment_number:user.user_address?.user_apartment_number||'', 
  //     user_postal_code:user.user_address?.user_postal_code||'',
  //   replacementEmail: '', // מייל חדש במקרה של שינוי
    
  // });
       const [formData, setFormData] = useState({
    user_firstname:userData?.data?.user_firstname|| user?.user_firstname|| '',
    user_lastname:userData?.data?.user_lastname|| user?.user_lastname|| '',
    user_email:userData?.data?.user_email|| user?.user_email|| '',
    verifyEmail:userData?.data?.verifyEmail||user?.verifyEmail||false,
    user_phone_number: userData?.data?.user_phone_number||user?.user_phone_number||'',
   
      user_city:userData?.data?.user_address?.user_city||user?.user_address?.user_city||'',
      user_street:userData?.data?.user_address?.user_street||user?.user_address?.user_street||'',
      user_Bilding_number:userData?.data?.user_address?.user_Bilding_number||user?.user_address?.user_Bilding_number||'',
      user_apartment_number:userData?.data?.user_address?.user_apartment_number||user?.user_address?.user_apartment_number||'', 
      user_postal_code:userData?.data?.user_address?.user_postal_code||user?.user_address?.user_postal_code||'',
    replacementEmail: '', // מייל חדש במקרה של שינוי
    
  });


  //     const [OriginalData, setOriginalData] = useState({
  //     user_firstname:user.user_firstname|| '',
  //     user_lastname:user.user_lastname|| '',
  //     user_email:user.user_email|| '',
  //     verifyEmail:user.verifyEmail||false,
  //     user_phone_number: user.user_phone_number||'',
  //     user_address:{
  //     user_city:user.user_address?.user_city||'',
  //     user_street:user.user_address?.user_street||'',
  //     user_Bilding_number:user.user_address?.user_Bilding_number||'',
  //     user_apartment_number:user.user_address?.user_apartment_number||'', 
  //     user_postal_code:user.user_address?.user_postal_code||'',
  //     replacementEmail: '', // מייל חדש במקרה של שינוי

  //   }
  // });
   const [OriginalData, setOriginalData] = useState({
    user_firstname:userData?.data?.user_firstname|| user?.user_firstname|| '',
    user_lastname:userData?.data?.user_lastname|| user?.user_lastname|| '',
    user_email:userData?.data?.user_email|| user?.user_email|| '',
    verifyEmail:userData?.data?.verifyEmail||user?.verifyEmail||false,
    user_phone_number: userData?.data?.user_phone_number||user?.user_phone_number||'',
   
      user_city:userData?.data?.user_address?.user_city||user?.user_address?.user_city||'',
      user_street:userData?.data?.user_address?.user_street||user?.user_address?.user_street||'',
      user_Bilding_number:userData?.data?.user_address?.user_Bilding_number||user?.user_address?.user_Bilding_number||'',
      user_apartment_number:userData?.data?.user_address?.user_apartment_number||user?.user_address?.user_apartment_number||'', 
      user_postal_code:userData?.data?.user_address?.user_postal_code||user?.user_address?.user_postal_code||'',
    replacementEmail: '', // מייל חדש במקרה של שינוי

    }
  );


  useEffect(() => {
setFormData({
    user_firstname: user.user_firstname || '',
    user_lastname: user.user_lastname || '',
    user_email: user.user_email || '',
    verifyEmail: user.verifyEmail || false,
    user_phone_number: user.user_phone_number || '',
    
      user_city: user.user_address?.user_city || '',
      user_street: user.user_address?.user_street || '',
      user_Bilding_number: user.user_address?.user_Bilding_number || '',
      user_apartment_number: user.user_address?.user_apartment_number || '', 
      user_postal_code: user.user_address?.user_postal_code || '',  
    replacementEmail: '', // מייל חדש במקרה של שינוי
  });

   }, [userData]);


  //   const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value
  //   });
  //  }
   const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'user_phone_number') {
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




  const cancelChanges = () => {
    setIsEditing(false)
    setFormData({
    user_firstname:user.user_firstname|| '',
    user_lastname:user.user_lastname|| '',
    user_email:user.user_email|| '',
    verifyEmail:user.verifyEmail||false,
    user_phone_number: user.user_phone_number||'',
    
      user_city:user.user_address?.user_city||'',
      user_street:user.user_address?.user_street||'',
      user_Bilding_number:user.user_address?.user_Bilding_number||'',
      user_apartment_number:user.user_address?.user_apartment_number||'', 
      user_postal_code:user.user_address?.user_postal_code||'',
    replacementEmail: '', // מייל חדש במקרה של שינוי

      
    }
    )
    };

 const handleSave = () => {


    console.log("Saving changes:", formData);

    // תמיד בנה את האובייקט dataToSend, ללא קשר אם האימייל השתנה או לא
    const dataToSend = {
        user_firstname: formData.user_firstname,
        user_lastname: formData.user_lastname,
        user_email: formData.user_email, // זה יהיה האימייל הנוכחי מהטופס
        user_phone_number: formData.user_phone_number,
        user_address: {
            user_city: formData.user_city,
            user_street: formData.user_street,
            user_Bilding_number: formData.user_Bilding_number,
            user_apartment_number: formData.user_apartment_number,
            user_postal_code: formData.user_postal_code,
        },
    replacementEmail: '', // מייל חדש במקרה של שינוי

        // verifyEmail: formData.verifyEmail, // השרת אמור לטפל בזה כשמשנים אימייל
    };

    if (OriginalData.user_email !== formData.user_email) {
      console.log("הגעתי")
        // אם האימייל שונה, אנחנו רוצים לשלוח את המייל המקורי כ-user_email לזיהוי,
        // ואת המייל החדש כ-replacementEmail.
        // השרת יטפל באוטנטיקציה עם המייל המקורי ויעדכן את החדש.
        dataToSend.replacementEmail = formData.user_email; // המייל החדש מהטופס
        dataToSend.user_email = OriginalData.user_email; // המייל המקורי של המשתמש

        // לרוב, אם יש שינוי במייל, נרצה לאפס את סטטוס האימות בצד השרת
        // אך אם השרת לא עושה זאת אוטומטית, אפשר לשלוח גם כאן
        // dataToSend.verifyEmail = false;
console.log(dataToSend,"Email changed, sending update with new email.");
        updateWith_Mail(dataToSend); // קורא למוטציה ומעביר לה את dataToSend
    } else {
        console.log("No change in email, updating other details.");
        // במקרה שאין שינוי באימייל, נשלח את dataToSend כפי שהוא
        updateWith_No_Mail(dataToSend); // קורא למוטציה ומעביר לה את dataToSend
    }
};

  const { mutate:updateWith_No_Mail } = useMutation({
    mutationKey: ["update_user_details_noMail"],
    mutationFn: async (dataToSend) =>
      await axios.post(`/Users/updateUserProfile_No_Mail/${user._id}`,dataToSend 
      ),
    onSuccess: (data) => {
      console.log(data);
      if (data.status === 200) {
        console.log(" פרופיל עודכן בהצלחה");
        setIsEditing(false); // סגירת מצב העריכה
        setUser({
          ...data.data.data,  })

      } else {
        console.log("הייתה בעיה  בעדכון הפרופיל, נסה שוב מאוחר יותר");
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

    const { mutate:updateWith_Mail } = useMutation({
    mutationKey: ["update_user_details_Mail"],
    mutationFn: async (dataToSend) =>
      await axios.post(`/Users/updateUserProfile_With_Mail/${user._id}`, dataToSend
      ),
    onSuccess: (data) => {
      console.log(data);
      if (data.status === 200) {
        console.log(" פרופיל עודכן בהצלחה תבדוק את המייל לאמת אותו");
        toastSuccess("פרופיל עודכן בהצלחה,  לפני שיבוצע השינוי תבדוק את המייל  החדש לאימות");
        setIsEditing(false); // סגירת מצב העריכה

      } else {
        console.log("הייתה בעיה  בעדכון הפרופיל, נסה שוב מאוחר יותר");
        toastError("הייתה בעיה  בעדכון הפרופיל, נסה שוב מאוחר יותר");
      }
    },
    onError: (err) => {
      console.log(err);
      toastError("הייתה בעיה  בעדכון הפרופיל, נסה שוב מאוחר יותר");
    },
  });




  return (
     <div>
                    <h2 className="text-xl font-bold">פרטים אישיים</h2>

                  <div className="flex justify-end items-center mb-6 gap-5">
                    <button 
                      onClick={isEditing ? handleSave : handleEditToggle}
                      className={`px-4 py-2 rounded-md ${isEditing ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} text-white flex items-center gap-2`}
                    disabled={phoneError !== ""? true : false}
                    >
                      <Edit className="h-4 w-4" />
                      {isEditing ? "שמור שינויים" : "ערוך פרטים"}
                    </button>
                    {isEditing&&
                    <button
                    className={`px-4 py-2 rounded-md  bg-blue-600 hover:bg-blue-700"} text-white flex items-center gap-2`}
                    onClick={()=>
                    {
                      cancelChanges()
                      setPhoneError('')
                    }
                    }
                    >
                      ביטול
                    </button>
                    }
                  </div>
    
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Details Section */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">שם פרטי</label>
                        {isEditing ? (
                          <input 
                            type="text" 
                            name="user_firstname" 
                            value={formData.user_firstname} 
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        ) : (
                          <p className="p-2 bg-gray-50 rounded-md">{user.user_firstname}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">שם משפחה</label>
                        {isEditing ? (
                          <input 
                            type="text" 
                            name="user_lastname" 
                            value={formData.user_lastname} 
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        ) : (
                          <p className="p-2 bg-gray-50 rounded-md">{formData.user_lastname}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">אימייל</label>
                        <div className="flex items-center gap-2">
                          {isEditing ? (
                            <input 
                              type="email" 
                              name="user_email" 
                              value={formData.user_email} 
                              onChange={handleInputChange}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            />
                          ) : (
                            <p className="p-2 bg-gray-50 rounded-md flex-grow">{formData.user_email}</p>
                          )}
                          {formData.verifyEmail ? 
                            <span className="text-green-500 flex items-center gap-1" title="כתובת אימייל מאומתת">
                              <CheckCircle className="h-4 w-4" />
                            </span> : 
                            <span className="text-red-500 flex items-center gap-1" title="אימייל לא מאומת">
                              <XCircle className="h-4 w-4" />
                            </span>
                          }
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">טלפון</label>
                        {isEditing ? (
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-gray-500" />
                            <input 
                              type="tel" 
                              name="user_phone_number" 
                              value={formData.user_phone_number} 
                              onChange={handleInputChange}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        

                          </div>
                        ) : (
                          <p className="p-2 bg-gray-50 rounded-md flex items-center">
                            <Phone className="h-4 w-4 ml-2 text-gray-500" />
                            {formData.user_phone_number}
                          </p>
                        )}
                      </div>
                       {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
                    </div>
    
                    {/* Address Section */}
                    <div className="space-y-4">
                      <h3 className="font-medium text-lg">כתובת</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">עיר</label>
                        {isEditing ? (
                          <input 
                            type="text" 
                            name="user_city" 
                            value={formData.user_city} 
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        ) : (
                          <p className="p-2 bg-gray-50 rounded-md">{user.user_address?.user_city}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">רחוב</label>
                        {isEditing ? (
                          <input 
                            type="text" 
                            name="user_street" 
                            value={formData.user_street} 
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        ) : (
                          <p className="p-2 bg-gray-50 rounded-md">{user.user_address?.user_street}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">מספר בניין</label>
                          {isEditing ? (
                            <input 
                              type="number" 
                              name="user_Bilding_number" 
                              value={formData.user_Bilding_number} 
                              onChange={handleInputChange}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            />
                          ) : (
                            <p className="p-2 bg-gray-50 rounded-md">{user.user_address?.user_Bilding_number}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">מספר דירה</label>
                          {isEditing ? (
                            <input 
                              type="number" 
                              name="user_apartment_number" 
                              value={formData.user_apartment_number} 
                              onChange={handleInputChange}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            />
                          ) : (
                            <p className="p-2 bg-gray-50 rounded-md">{user.user_address?.user_apartment_number}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">מיקוד</label>
                        {isEditing ? (
                          <input 
                            type="number" 
                            name="user_postal_code" 
                            value={formData.user_postal_code} 
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        ) : (
                          <p className="p-2 bg-gray-50 rounded-md">{user.user_address?.user_postal_code}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}


export default PersonalDetails