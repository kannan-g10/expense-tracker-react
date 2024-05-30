import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { MdOutlineLightMode } from 'react-icons/md';
import { FaUserEdit } from 'react-icons/fa';
import { MdOutlineLogout } from 'react-icons/md';

import title from '../assets/title.png';
import { logout } from '../helpers/authentication';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [currentUserImage, setCurrentUserImage] = useState(null);

  const { imageUrl } = useSelector(state => state.authSlice);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUserImage(imageUrl);
  }, [imageUrl]);

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <div className="flex justify-between items-center px-10 bg-[#4A0906] text-white w-full h-20">
      <div className="flex items-center gap-x-3 lg:gap-x-10 bg-[#4A0906]">
        <Link to="/">
          <img
            src={title}
            alt="Expense Tracker"
            className="hidden md:block h-14 w-32 rounded-lg cursor-pointer"
          />
        </Link>
        <nav>
          <ul className="flex gap-x-2 bg-[#4A0906]">
            <Link to="/">
              <li className="text-sm md:text-2xl font-semibold bg-[#4A0906] cursor-pointer hover:bg-[#FAD9D0] hover:text-[#4A0906] py-3 px-5 rounded-lg duration-300">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="text-sm md:text-2xl font-semibold bg-[#4A0906] cursor-pointer hover:bg-[#FAD9D0] hover:text-[#4A0906] py-3 px-5 rounded-lg duration-300">
                About
              </li>
            </Link>
            <Link to="/contact">
              <li className="text-sm md:text-2xl font-semibold bg-[#4A0906] cursor-pointer hover:bg-[#FAD9D0] hover:text-[#4A0906] py-3 px-5 rounded-lg duration-300">
                Contact Us
              </li>
            </Link>
          </ul>
        </nav>
      </div>
      <div className="flex gap-x-5 relative">
        <MdOutlineLightMode size={40} className="cursor-pointer bg-[#4A0906]" />
        {currentUserImage ? (
          <img
            src={currentUserImage}
            alt="Profile-image"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setShowProfileModal(true)}
          />
        ) : (
          <IoPersonCircleOutline
            size={40}
            className="cursor-pointer bg-[#4A0906]"
            onClick={() => setShowProfileModal(true)}
          />
        )}
        {showProfileModal && (
          <div
            className="absolute top-12 right-4 bg-[brown] flex flex-col items-center w-52 py-5 px-3 rounded-xl"
            onMouseOver={() => setShowProfileModal(true)}
            onMouseLeave={() => setShowProfileModal(false)}
          >
            <Link
              to="/update-profile"
              className="w-full bg-red-500 rounded-md my-1 flex items-center justify-around hover:bg-rose-300 mx-auto text-white hover:text-black duration-500 font-semibold p-3"
            >
              Update Profile
              <FaUserEdit size={25} />
            </Link>
            <Link
              to="/"
              className="w-full bg-red-500 rounded-md my-1 flex items-center justify-around hover:bg-rose-300 mx-auto text-white hover:text-black duration-500 font-semibold p-3"
              onClick={handleLogout}
            >
              Logout <MdOutlineLogout size={30} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;