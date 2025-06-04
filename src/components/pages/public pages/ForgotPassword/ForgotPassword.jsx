import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { useMutation } from "@tanstack/react-query";
import { toastSuccess, toastError } from '../../../UI/Toast';

function ForgotPassword() {
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

  const [userEmail, setUserEmail] = useState("");
  const [disableForm, setDisableForm] = useState(false);
const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["forgot_password"],
    mutationFn: async () => await axios.post(`/Users/forgotPassword?email=${userEmail}`),
    onSuccess: (data) => {
      console.log(data);
              toastSuccess("נשלח מייל לאיפוס הסיסמה");
              navigate("/Login");

      
      if (data.status === 200) {
        console.log("נשלח אימייל לאיפוס סיסמה");
      } else {
        console.log("הייתה בעיה בשליחת האימייל, נסה שוב מאוחר יותר");
        toastError("הייתה בעיה בשליחת האימייל, נסה שוב מאוחר יותר");
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleChange = (e) => {
    setUserEmail(e.target.value);
    console.log(userEmail);
  };

  return (
    <div className='bg-f0f0f0 dark:bg-gray-900 flex justify-center items-center h-screen'>
    <form className='dark:bg-444 p-5 rounded-lg shadow-md w-full max-w-md'
      onSubmit={(e) => {
        e.preventDefault();
        mutate();
      }}>
      
      <h1 className='mb-5 text-center font-bold text-lg'>שכחתי סיסמה</h1>
      
      <div className='mb-5'>
        <label className='block mb-1' htmlFor="email">אימייל:</label>
        <input
          className='w-full p-2.5 border border-gray-300 rounded bg-fff text-black
          dark:bg-444 dark:text-white'
          type="email"
          id="email"
          name='email'
          value={userEmail}
          onChange={handleChange}
          required
        />
      </div>
      
      <p className='block mb-1 '>
        הזן את כתובת האימייל שלך ואנו נשלח לך קישור לאיפוס הסיסמה
      </p>
      
      <button
        type="submit"
        style={styles.button}
        onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
        onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
      >
        שלח קישור לאיפוס סיסמה
      </button>
      
      <div className='mt-4'>
        <div className='flex flex-col justify-center items-center mt-4 gap-3'>
          <span className='text-sm'>?נזכרת בסיסמה</span>
          <Link to={"/Login"} Name='mr-2 text-blue-700'>כניסה לחשבון</Link>
        </div>
      </div>
    </form>
    </div>
  );
}

export default ForgotPassword;