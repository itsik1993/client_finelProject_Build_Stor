import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import axios from 'axios';

import AuthProvider from './components/Context/AuthGlobalContext.jsx';
import GlobalProvider from './components/Context/GlobalContext.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

// axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

const queryClient = new QueryClient();
const initialOptions = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
  currency: "ILS",
  intent: "capture",
};


createRoot(document.getElementById('root')).render(
        <QueryClientProvider client={queryClient}>
    <AuthProvider> {/* עוטף הכל - נגישות ל־Auth בכל מקום */}
      <GlobalProvider> {/* כולל את ActionContext */}
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <PayPalScriptProvider options={initialOptions}>
            <App />
            <ToastContainer />
           </ PayPalScriptProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </GoogleOAuthProvider>
      </GlobalProvider>
    </AuthProvider>
        </QueryClientProvider>
);
