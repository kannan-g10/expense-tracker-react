import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TrackerForm from '../components/TrackerForm';
import Expenses from '../components/Expenses';
import ExpenseData from '../components/ExpenseData';
import { auth } from '../config/firebase-config';
import { getCurrentUser } from '../helpers/authentication';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/features/authSlice';

const Home = () => {
  const { name, imageUrl } = useSelector(state => state.authSlice);
  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    getCurrentUser(dispatch, addUser);
  }, []);

  useEffect(() => {
    setCurrentUser({ name, imageUrl });
  }, [name, imageUrl]);

  if (!currentUser?.name) {
    return (
      <p className="text-center mt-32 text-violet-500 text-xl">Loading...</p>
    );
  }

  return (
    <>
      {currentUser ? (
        <div className="bg-rose-100">
          <Navbar />
          <h1 className="font-serif text-2xl font-bold m-2 hover:animate-pulse cursor-pointer text-rose-700 absolute">
            Welcome {currentUser?.name}!
          </h1>
          <div className="w-full flex flex-col mt-5">
            <TrackerForm />
          </div>
          <Expenses />
          <ExpenseData />
        </div>
      ) : (
        <p className="text-blue-500 text-center mt-32">Loading..</p>
      )}
    </>
  );
};

export default Home;
