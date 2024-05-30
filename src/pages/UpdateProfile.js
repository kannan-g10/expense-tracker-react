import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import updateProfile from '../assets/update-profile.png';
import { updateCurrentUser } from '../helpers/authentication';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa6';

const UpdateProfile = () => {
  const [updatedName, setUpdatedName] = useState('');
  const [updatedImageUrl, setUpdatedImageUrl] = useState('');

  const navigate = useNavigate();

  const handleUpdate = () => {
    if (updatedName == '' || updatedImageUrl == '') {
      toast.error('All fields are mandatory!');
      return;
    }
    updateCurrentUser(updatedName, updatedImageUrl, navigate);
    setUpdatedName('');
    setUpdatedImageUrl('');
  };
  return (
    <div className="w-full h-screen bg-rose-100 flex justify-center items-center">
      <Link to="/">
        <button className="px-4 py-2 bg-teal-400 text-xl hover:bg-cyan-600 text-white font-semibold rounded-lg absolute top-5 left-8">
          <FaArrowLeft className="inline mr-1 mb-1 font-bold text-lg" />
          Go Back
        </button>
      </Link>
      <div className="flex justify-center items-center rounded-xl md:w-2/3 md:mx-auto bg-[brown]">
        <img
          src={updateProfile}
          alt="Update Profile"
          className="hidden md:block w-2/3 h-1/2 rounded-l-xl"
        />
        <div className="flex flex-col justify-center w-1/3 h-1/2 py-14 px-3">
          <h1 className="text-center text-3xl font-bold mb-10 text-white">
            Update Your Profile
          </h1>
          <input
            type="text"
            placeholder="Name"
            value={updatedName}
            onChange={e => setUpdatedName(e.target.value)}
            required
            className="border px-5 py-2 m-3 outline-none placeholder:text-black bg-rose-100"
          />
          <input
            type="text"
            placeholder="Image Url"
            value={updatedImageUrl}
            onChange={e => setUpdatedImageUrl(e.target.value)}
            required
            className="border px-5 py-2 m-3 outline-none  placeholder:text-black bg-rose-100"
          />

          <button
            className="bg-[#fd325b] text-white hover:bg-red-500 px-5 py-2 w-1/2 my-5 mx-auto text-xl font-bold rounded-lg "
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
