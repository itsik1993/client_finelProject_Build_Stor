import React, { useState,useContext,useEffect } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { useMutation } from "@tanstack/react-query";
import Loading from '../../../UI/Loading';
import { toastSuccess, toastError } from '../../../UI/Toast';



function RegisterForm() {
  const styles = {
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },

  };


  const ininialvalues={
    user_firstname:"",
    user_lastname:"",
    user_email:"",
    user_password:"",
    user_confirmPassword:""
  }

  const [values,setValues]=useState(ininialvalues)
const navigate = useNavigate();
const [isLoading, setIsLoading] = useState(false);


  const { mutate, data, error, isError} = useMutation({
    mutationKey: ["Register_user"],
    mutationFn: async () =>
      await axios.post(`/Users/Register`, values)

    ,
    onSuccess: (data) => {
  console.log(isLoading); // בדוק כאן את הערך של isLoading

      console.log(data);
      if (data.status === 200) {
        console.log(isLoading ,1)
        toastSuccess(data?.data.message);
        console.log("ההרשמה בוצעה בהצלחה, בדוק את האימייל שלך לאימות");
        navigate("/Login");
        setIsLoading(false); // Set loading state to false after the request
      } else {
        console.log("הייתה בעיה בהרשמה, נסה שוב מאוחר יותר");
        console.log(isLoading,2)
      }
    },
    onError: (err) => {
      console.log(err);
      // const message = error.response.data.error;
      setIsLoading(false); // Set loading state to false after the request
      toastError(err.response.data.message);
      console.log(isLoading)
    },
  });

    function handleChange(e){
      const {name,value}=e.target 
      setValues({ ...values,[name]:value })
      console.log(values)
    }
   

  return (
        <form className='dark:bg-444 p-5 rounded-lg shadow-md w-full max-w-md'
        onSubmit={(e) => {
          e.preventDefault();
          setIsLoading(true); // Set loading state to true before the request
          mutate();
        }}>
    
  
    <h1 className='mb-5 text-center font-bold text-lg'>הרשמה לאתר</h1>
    
    <div className='mb-5 flex gap-5'>
        <div className='flex flex-col justify-center items-center'>
      <label className='block mb-1 ' htmlFor="user_firstname">שם פרטי:</label>
      <input
        className='w-full p-2.5 border border-gray-300 rounded bg-fff text-black
        dark:bg-444 dark:text-white'
        type="text"
        id="user_firstname"
        name='user_firstname'
        onChange={handleChange}
        required
      />
      </div>
      <div className='flex flex-col justify-center items-center'>
         <label className='block mb-1' htmlFor="user_lastname">שם משפחה:</label>
      <input
        className='w-full p-2.5 border border-gray-300 rounded bg-fff text-black
        dark:bg-444 dark:text-white'
        type="text"
        id="user_lastname"
        name='user_lastname'
        onChange={handleChange}
        required
      />
      </div>
    </div>
  
    <div className='mb-5'>
      <label className='block mb-1' htmlFor="email">אימייל:</label>
      <input
        className='w-full p-2.5 border border-gray-300 rounded bg-fff text-black
        dark:bg-444 dark:text-white'
        type="email"
        id="email"
        name='user_email'
        onChange={handleChange}
        required
      />
    </div>
  
    <div className='mb-5'>
      <label className='block mb-1' htmlFor="password">סיסמה:</label>
      <input
        className='w-full p-2.5 border border-gray-300 rounded bg-fff text-black
        dark:bg-444 dark:text-white'
        type="password"
        id="password"
        name='user_password'
        onChange={handleChange}
        required
      />
    </div>
  
    <div className='mb-5'>
      <label className='block mb-1' htmlFor="confirmPassword">אימות סיסמה:</label>
      <input
        className='w-full p-2.5 border border-gray-300 rounded bg-fff text-black
        dark:bg-444 dark:text-white'
        type="password"
        id="confirmPassword"
        name='user_confirmPassword'
        onChange={handleChange}
        required
      />
    </div>
  
    <div className='mb-5'>
      <div className='flex gap-1'>
        <input type="checkbox" id="terms" name="terms" />
        <label htmlFor="terms">אני מסכים/ה לתנאי השימוש</label>
      </div>
    </div>
  
    <button
      type="submit"
      // disabled={
      //   values.user_firstname === ""||
      //   values.user_lastname === ""||
      //   values.user_email === ""||
      //   values.user_password === ""||
      //   values.user_confirmPassword === ""
      //     ? true
      //     : isLoading
      // }
      disabled={isLoading} 
      style={styles.button }
      onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
      onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
    >
      {isLoading ? "...בטעינה" : "הרשמה"}
     

    </button>
    {isLoading&&<Loading/>}
    <div className='mt-4'>
      {/* <GooglButton /> */}
      <div className='flex flex-col  justify-center items-center mt-4 gap-3'>
        <span className='text-sm'>?כבר יש לך חשבון</span>
        <Link to={"/Login"} style={styles.link} className='mr-2 text-blue-700 '>כניסה לחשבון</Link>
      </div>
    </div>
  </form>
  )
}

export default RegisterForm