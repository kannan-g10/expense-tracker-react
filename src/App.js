import React, { useEffect, useState } from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { auth } from './config/firebase-config';
import UserRoutes from './routes/UserRoutes';
import NonUserRoutes from './routes/NonUserRoutes';
import Loading from './components/Loading';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(null);

  if (user) {
    console.log(user);
    console.log(user?.emailVerified);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setIsEmailVerified(user?.emailVerified);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, isEmailVerified]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {isEmailVerified ? <UserRoutes /> : <NonUserRoutes />}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="colored"
        transition={Slide}
      />
    </>
  );
};

export default App;
