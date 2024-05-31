import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../config/firebase-config';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const resetPasswordHandler = async e => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Reset email sent successfully');
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-tr from-indigo-500 to-fuchsia-500 flex justify-center">
      <div className="w-1/3 h-1/3 bg-white rounded-lg mt-20 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold text-violet-500">
          Forgot Password
        </h2>
        <form
          onSubmit={resetPasswordHandler}
          className="flex flex-col justify-start gap-5"
        >
          <div className="mt-5">
            <label htmlFor="email" className="p-4 text-xl ">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="p-3 border border-slate-300 outline-slate-400"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-5 py-2 rounded-lg"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
