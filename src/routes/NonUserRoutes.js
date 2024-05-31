import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../auth/Login';
import Register from '../auth/Register';
import EmailVerificationModal from '../auth/EmailVerification';
import Error from '../components/Error';
import ForgetPassword from '../auth/ForgetPassword';

const NonUserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/email-verify" element={<EmailVerificationModal />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/*" element={<Error />} />
    </Routes>
  );
};

export default NonUserRoutes;
