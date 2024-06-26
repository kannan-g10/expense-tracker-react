import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TrackerForm from '../components/TrackerForm';
import Expenses from '../components/Expenses';
import ExpenseData from '../components/ExpenseData';
import { auth } from '../config/firebase-config';
import { getCurrentUser } from '../helpers/authentication';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/features/authSlice';
import Loading from '../components/Loading';

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
    return <Loading />;
  }

  return (
    <>
      {currentUser ? (
        <div className="bg-rose-100 dark:bg-[#021F34]">
          <Navbar />
          <h1 className="italic text-3xl font-bold m-2 hover:animate-pulse cursor-pointer text-rose-700 dark:text-cyan-500 absolute">
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
