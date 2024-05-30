import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import UpdateProfile from '../pages/UpdateProfile';
import ContactUs from '../pages/ContactUs';
import Error from '../components/Error';

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
