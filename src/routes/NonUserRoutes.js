import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../auth/Login';
import Register from '../auth/Register';
import EmailVerificationModal from '../auth/EmailVerification';

const NonUserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/email-verify" element={<EmailVerificationModal />} />
    </Routes>
  );
};

export default NonUserRoutes;
