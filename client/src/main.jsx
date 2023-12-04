import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './contexts/userContext.jsx'
import { OrderProvider } from "./contexts/orderContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <UserProvider>
      <OrderProvider>
        <App />
      </OrderProvider>
    </UserProvider>
  // </React.StrictMode>
);
