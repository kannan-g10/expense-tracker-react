import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import UpdateProfile from '../pages/UpdateProfile';
import ContactUs from '../pages/ContactUs';
import Error from '../components/Error';
import { auth } from '../config/firebase-config';

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/update-profile" element={<UpdateProfile />} />
      <Route path="/*" element={<Error />} />
    </Routes>
  );
};

export default UserRoutes;
