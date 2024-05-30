import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="h-screen w-full bg-pink-100 flex justify-center items-center">
      <div className="text-2xl">
        404 page not found!
        <Link to="/">
          <span className="text-violet-500 underline px-3">Home</span>
        </Link>
      </div>
    </div>
  );
};

export default Error;
