
import React, { useState,useContext,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import GooglButton from '../../../UI/GooglButton';
import { AuthContext } from '../../../Context/AuthGlobalContext';
import { toastSuccess, toastError } from '../../../UI/Toast.jsx';


function LoginForm() {
  const {handleLogin} = useContext(AuthContext)
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const ininialvalues={
    user_email:"",
    user_password:""
  }
  const [values,setValues]=useState(ininialvalues)
   
  function handleChange(e){
    const {name,value}=e.target 
    setValues({ ...values,[name]:value })
    console.log(values)
  }
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    // Handle login logic here
   const result= await handleLogin(values)
   result && navigate("/")
   console.log(result, "this is the result");
  
  };

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
  return (
    <form className=' dark:bg-444 p-5 rounded-lg shadow-md w-full max-w-md'
    onSubmit={handleSubmit}>


    <h2 className='mb-5 text-center font-bold text-lg'>כניסה לאתר</h2>
    <div className='mb-5'>
      <label className='block mb-1' htmlFor="email">אימייל:</label>
      <input
        className='w-full p-2.5 border border-gray-300 rounded bg-fff  text-black
        dark:bg-444 dark:text-white'
        type="email"
        id="email"
        name='user_email'
        // value={values.user_email}
        onChange={handleChange}
        // required
      />
    </div>
<div >
      <label className='block mb-1' htmlFor="password">סיסמה:</label>
      <input
        className='w-full p-2.5 border border-gray-300 rounded bg-fff  text-black
        dark:bg-444 dark:text-white'
        type="password"
        id="password"
        name='user_password'
        // value={values.user_password}
        onChange={handleChange}
        
        // required
      />
</div>
    <button
      type="submit"
      style={styles.button}
      onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
      onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
    >
      כניסה 
    </button>
    <div >
      <div className='flex gap-1'>
      <input type="checkbox" id="remember" />
      <label htmlFor="remember">זכור אותי</label>
      </div>
        <GooglButton />
      <div className='flex justify-between items-center mt-4 flex-col float-end' >
      <Link to={"/Register"} style={styles.link}>הרשמה</Link>
      <Link to="/ForgotPassword" style={styles.link}>שכחתי סיסמה</Link>
      </div>
     
    </div>

  </form>
  )
}

export default LoginForm