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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {user?.emailVerified ? <UserRoutes /> : <NonUserRoutes />}

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
