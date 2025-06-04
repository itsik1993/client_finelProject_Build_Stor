//כל הפונקציות אימות והכניסה שאני רוצה שיהיו גלובלי, הכניסה חייבת להיות גלובלית כי היא משפיעה על כל הפעולות 
//והכניסות לאתר

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
// import { toastSuccess , toastError } from "../lib/Toast";
// import  GlobalContext  from "../Context/GlobalContext";
import { toastSuccess, toastError } from '../UI/Toast';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState( false);
  const [user, setUser] = useState(null);

//   const { clearCart } = useContext(GlobalContext);

  async function handleLogin(values) {
    try {
      console.log(values)
      console.log("the values")
        const { data } = await axios.post("/Users/Login", values);
        if(data.success){
          toastSuccess(data.message);

          setIsAuth(true);
          console.log(data ,"the user is dddddddddddddddddddddddddddddddddddd");
          setUser(data.user)
          return true;
        }
      } catch (error) {
        console.log(error);
        const msg = error.response.data.error
        toastError(msg)
        return false;
      }
  }

  async function getAuth() {
    try {
       const {data} = await axios.get("/Users/auth");
       console.log(data , "this is the data of cccccccccccccccccccccccccccccccccccccccccc")
       if(data.success){
        setIsAuth(true)
        setUser(data.user)
       }
    } catch (error) {
        console.log(error);
    }
  };
  
  async function logOut() {
    try {
       const { data } = await axios.get("/users/logout");
       if(data.success){
        // toastSuccess(data.message);
        setIsAuth(false)
        // clearCart()
       }
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getAuth()
  },[]);

  useEffect(() => {
    if (user) {
      console.log("User state updated:", user);
      // אפשר להוסיף כאן לוגיקה נוספת אם צריך
    }
    else
    {
    getAuth()

    }
  }, [user]);

  // useEffect(() => {
  //   if (user) {
      

  //   }

  // },[user]);

  const value = { isAuth , handleLogin , logOut , user , setUser,setIsAuth,getAuth };
  return <AuthContext.Provider
   value={value}>{children}
  </AuthContext.Provider>;
}

export default AuthProvider;
