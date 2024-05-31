import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../helpers/authentication';
import { auth } from '../config/firebase-config';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showEye, setShowEye] = useState(false);

  if (user) {
    console.log(user);
    console.log(user?.emailVerified);
  }

  const handleLogin = async () => {
    try {
      if (!email.includes('@') || password == '') {
        toast.error('Provide valid details!');
        return;
      }
      await loginUser(email, password, navigate);
      setEmail('');
      setPassword('');
    } catch (err) {
      toast.error('Login Failed!');
      console.error(err);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-tr from-indigo-500 to-fuchsia-500 h-screen w-full flex justify-center items-center">
        <div className="w-full md:w-1/2 lg:w-1/4 rounded-xl mx-5 bg-white flex flex-col items-center p-5">
          <h1 className="text-4xl font-bold m-3">Login</h1>
          <input
            type="email"
            placeholder="Email"
            required
            className="bg-slate-200 p-4 w-3/5 m-4 outline-none"
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
          <div>
            <button
              className="bg-indigo-600 text-xl text-white font-bold px-8 py-3 mt-5 rounded-lg hover:bg-indigo-600/90"
              onClick={handleLogin}
            >
              Login
            </button>
            <p className="text-violet-600 underline mb-4 py-1">
              <Link to="/forget-password">Forget Password</Link>
            </p>
          </div>
          <p>
            New User
            <Link to="/register" className="text-indigo-600 px-2 underline">
              Register Here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
