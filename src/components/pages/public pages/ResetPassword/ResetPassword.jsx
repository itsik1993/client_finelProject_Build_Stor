import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams, Link ,useNavigate} from 'react-router-dom';
import { useMutation } from "@tanstack/react-query";

function ResetPassword() {
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

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const initialValues = {
    new_password: "",
    confirm_password: ""
  };

  const [values, setValues] = useState(initialValues);
const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    console.log(values);
  };

  const { mutate } = useMutation({
    mutationKey: ["reset_password"],
    mutationFn: async () =>
      await axios.post(`/Users/resetPassword?email=${email}&token=${token}`, {
        user_password: values.new_password,
      }),
    onSuccess: (data) => {
      console.log(data);
      if (data.status === 200) {
        console.log("הסיסמה אופסה בהצלחה");
        navigate("/Login");
      } else {
        console.log("הייתה בעיה באיפוס הסיסמה, נסה שוב מאוחר יותר");
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <div className='bg-f0f0f0 dark:bg-gray-900 flex justify-center items-center h-screen'>
      <form className='dark:bg-444 p-5 rounded-lg shadow-md w-full max-w-md'
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}>
        
        <h1 className='mb-5 text-center font-bold text-lg'>איפוס סיסמה</h1>
        
        <div className='mb-5'>
          <label className='block mb-1 ' htmlFor="new_password">סיסמה חדשה:</label>
          <input
             className='w-full p-2.5 border border-gray-300 rounded bg-fff text-black
        dark:bg-444 dark:text-white'
            type="password"
            id="new_password"
            name='new_password'
            placeholder="••••••••"
            onChange={handleChange}
            required
          />
        </div>
        
        <div className='mb-5'>
          <label className='block mb-1 ' htmlFor="confirm_password">אימות סיסמה:</label>
          <input
      className='w-full p-2.5 border border-gray-300 rounded bg-fff text-black
        dark:bg-444 dark:text-white'
            type="password"
            id="confirm_password"
            name='confirm_password'
            placeholder="••••••••"
            onChange={handleChange}
            required
          />
        </div>
        
        <div className='mb-5'>
          <div className='flex gap-1'>
            <input 
              type="checkbox" 
              id="terms" 
              name="terms" 
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" 
              required 
            />
            <label htmlFor="terms" className='block mb-1 '>אני מסכים/ה לתנאי השימוש</label>
          </div>
        </div>
        
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
          className="focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          איפוס סיסמה
        </button>
        
        <div className='mt-4'>
          <div className='flex flex-col justify-center items-center mt-4 gap-3'>
            <span className='block mb-1 '>?נזכרת בסיסמה</span>
            <Link to={"/Login"} className='mr-2 text-blue-700 dark:text-blue-400 hover:underline'>כניסה לחשבון</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;