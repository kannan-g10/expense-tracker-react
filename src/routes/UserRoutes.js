import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import UpdateProfile from '../pages/UpdateProfile';
import ContactUs from '../pages/ContactUs';

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/update-profile" element={<UpdateProfile />} />
    </Routes>
  );
};

export default UserRoutes;
