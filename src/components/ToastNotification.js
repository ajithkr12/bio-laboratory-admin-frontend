import React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ToastNotification = () => {

  return (
    <ToastContainer
    position="top-center"
    theme="colored"
    autoClose={1000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
  />
  )
}

export default ToastNotification;