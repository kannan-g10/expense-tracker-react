import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const GoBack = () => {
  return (
    <Link to="/">
      <button className="px-4 py-2 bg-teal-400 text-xl hover:bg-cyan-600 text-white font-semibold rounded-lg absolute top-5 left-8">
        <FaArrowLeft className="inline mr-1 mb-1 font-bold text-lg" />
        Go Back
      </button>
    </Link>
  );
};

export default GoBack;
