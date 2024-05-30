import React, { useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUser } from '../helpers/authentication';
import EmailVerificationModal from './EmailVerification';

const Register = ({}) => {
  const [isOpen, setIsopen] = useState(false);

  const [showEye, setShowEye] = useState(false);
  const [showConfirmEye, setShowConfirmEye] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleRegistration = async () => {
    try {
      if (
        name == '' ||
        email == '' ||
        password == '' ||
        confirmPassword == ''
      ) {
        toast.error('All fields are Mandatory!');
        return;
      }

      if (!email.includes('@')) {
        toast.error('Email not valid!');
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Password doesn't match!");
        return;
      }

      await createUser(name, email, password, navigate);

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setIsopen(true);
    } catch (err) {
      toast.error('Registration Failed!');
      console.error(err);
    }
  };

  return (
    <>
      {isOpen && <EmailVerificationModal onClose={() => setIsopen(false)} />}
      <div className="bg-gradient-to-tr from-indigo-500 to-fuchsia-500 h-screen w-full flex justify-center items-center">
        <div className="w-full md:w-1/2 lg:w-1/4 rounded-xl mx-5 bg-white flex flex-col items-center p-5">
          <h1 className="text-4xl font-bold m-3">Register</h1>
          <input
            type="text"
            placeholder="Name"
            required
            className="bg-slate-200 p-4 w-3/5 my-2 outline-none"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="bg-slate-200 p-4 w-3/5 mt-2 mb-4 outline-none"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div className="bg-slate-200 w-3/5 flex items-center relative">
            <input
              type={!showEye ? 'password' : 'text'}
              placeholder="Password"
              className="bg-slate-200 m-2 py-2 w-full outline-none"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <span
              className="absolute right-5 cursor-pointer"
              onMouseDown={() => setShowEye(true)}
              onMouseUp={() => setShowEye(false)}
              onMouseLeave={() => setShowEye(false)}
            >
              {showEye ? <IoEyeOff size={20} /> : <IoEye size={20} />}
            </span>
          </div>
          <div className="bg-slate-200 w-3/5 flex items-center relative my-3">
            <input
              type={!showConfirmEye ? 'password' : 'text'}
              placeholder="Confirm Password"
              className="bg-slate-200 m-2 py-2 w-full outline-none"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <span
              className="absolute right-5 cursor-pointer"
              onMouseDown={() => setShowConfirmEye(true)}
              onMouseUp={() => setShowConfirmEye(false)}
              onMouseLeave={() => setShowConfirmEye(false)}
            >
              {showConfirmEye ? <IoEyeOff size={20} /> : <IoEye size={20} />}
            </span>
          </div>
          <button
            className="bg-indigo-600 text-xl text-white font-bold px-8 py-3 my-5 rounded-lg hover:bg-indigo-600/90"
            onClick={handleRegistration}
          >
            Register
          </button>
          <p>
            Already registered
            <Link to="/login" className="text-indigo-600 px-2 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
