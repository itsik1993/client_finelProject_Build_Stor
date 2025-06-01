import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
  Navigate
} from 'react-router-dom'
import './App.css'
import { AuthContext } from './components/Context/AuthGlobalContext'
import { useContext } from 'react'
import CartModal from '../src/components/pages/public pages/Stor/CartModal'


// layout
import Nav from './components/Layout/NAV'

// pages
import Login from './components/pages/public pages/Login/Login'
import HomePage from '../src/components/pages/public pages/Hompage/HomePage'

function Root() {
  // מציג את כל שאר האוטלט שלא מוגנים ציבורית ולא פרטיים שהם הכללים והשכבה הכללית 
  // console.log(isAuth,"this is the second isAuth")
  return (
    <div>
       <Nav/>
      <CartModal />
      <Outlet />
    </div>
  )
}

function PublicRoute({ isAuth }) {
  // אם המשתמש לא מאומת זה יציג את הראטורים הציבורים שהכנסתי 
  // return !isAuth ? <Outlet /> : <Navigate to="/User/Profile" />;
  return !isAuth ? <Outlet /> : <Navigate to="/" />;
}

// 1
function PrivateRoute({ isAuth }) {
  // אם המשתמש מאומת הוא מציג את האווטלוק שזה הראטורים המוגנים 
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate('/');
  //   }
  // }, [isAuth, navigate]);
  return isAuth ? <Outlet /> : <Navigate to="/" />;
}


function App() {

const{ isAuth } = useContext(AuthContext)
  const router = createBrowserRouter(
    createRoutesFromElements(
      // הראטור שעוטף את כל הראטורים 
      <Route path="/" element={<Root/>}>
      
        {/* Public Routes */}
        <Route index element={<HomePage/>} />
        
        <Route element={<PublicRoute isAuth={isAuth} />}>
        <Route
            path="Register"
            lazy={async () => ({
              Component: (await import('../src/components/pages/public pages/Register/Register')).default,
            })}
          />
          <Route
            path="Login"
            lazy={async () => ({
              Component: (await import('../src/components/pages/public pages/Login/Login')).default,
            })}
          />
            <Route
            path="ForgotPassword"
            lazy={async () => ({
              Component: (await import('../src/components/pages/public pages/ForgotPassword/ForgotPassword')).default,
            })}
          />
                <Route
            path="ResetPassword"
            lazy={async () => ({
              Component: (await import('../src/components/pages/public pages/ResetPassword/ResetPassword')).default,
            })}
          />
          </Route>
          <Route
            path="Contact"
            lazy={async () => ({
              Component: (await import('../src/components/pages/public pages/Contact/Contact')).default,
            })}
          />
            <Route
            path="Store"
            lazy={async () => ({
              Component: (await import('../src/components/pages/public pages/Stor/Stor')).default,
            })}
          />
           <Route
          path="store/:id"
          lazy={async () => ({
            Component: (await import("../src/components/pages/public pages/Stor/SingelProduct")).default,
          })}
        />
            <Route
          path="checkout"
          lazy={async () => ({
            Component: (await import("./components/pages/public pages/Stor/OrderSummery")).default,
          })}
        />
                <Route
          path="payment"
          lazy={async () => ({
            Component: (await import("./components/pages/public pages/Stor/payment")).default,
          })}
        />
                 <Route
          path="order-confirmation"
          lazy={async () => ({
            Component: (await import("./components/pages/public pages/Stor/OrderConfirmation")).default,
          })}
        />
       
       


{/* Private Route => Only For Authenticate User */}
       <Route element={<PrivateRoute isAuth={isAuth} />}>
                {/* הוסף כאן את הניתובים הפרטיים שלך */}
           {/* <Route
            path="User/Orders"
            lazy={async () => ({
              Component: (await import('../src/components/pages/privet pages/Orders/orders')).default,
            })}
          /> */}
            <Route
            path="User/Profile"
            lazy={async () => ({
              Component: (await import('../src/components/pages/privet pages/ProfilePage/Profile')).default,
            })}
          />


              </Route>



        </Route>
      

    )

  )




  return (
  <>
  <RouterProvider router={router}/>
  </>
  )
}

export default App


