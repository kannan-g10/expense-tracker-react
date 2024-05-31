import { toast } from 'react-toastify';
import { auth, db } from '../config/firebase-config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';

export const createUser = async (name, email, password, navigate) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    if (user) {
      await setDoc(doc(db, 'Users', user.uid), {
        name,
        email,
        password,
        imageUrl: '',
      });
    }
    toast.success('Registration Successful!');
    navigate('/email-verify');
    return true;
  } catch (err) {
    toast.error('Registration Failed!');
    console.error(err);
    return false;
  }
};

export const loginUser = async (email, password, navigate) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    if (user && user.emailVerified) {
      toast.success('Login Successful!');
      window.location.href = '/';
    } else {
      toast.error('Verify Your Email To Login!');
    }
  } catch (err) {
    toast.error('Account Not Found!');
    console.error(err);
  }
};

export const logout = async navigate => {
  try {
    await signOut(auth);
    await auth.signOut();
    toast.success('Logout successful');
    navigate('/login');
  } catch (err) {
    toast.error('Something went wrong!');
    console.error(err);
  }
};

export const getCurrentUser = (dispatch, addUser) => {
  try {
    auth.onAuthStateChanged(async user => {
      if (user) {
        const docRef = doc(db, 'Users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          dispatch(addUser(docSnap.data()));
        }
      }
    });
  } catch (err) {
    console.error(err);
    toast.error('Something went wrong!');
  }
};

export const updateCurrentUser = async (name, imageUrl, navigate) => {
  try {
    const user = auth.currentUser;
    const docRef = doc(db, 'Users', user.uid);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const existingData = docSnap.data();

      const newData = {
        ...existingData,
        name: name || existingData.name,
        imageUrl: imageUrl || existingData.imageUrl,
      };

      await setDoc(docRef, newData);

      toast.success('Profile updated successfully!');
      navigate('/');
    } else {
      toast.error('User data not found!');
    }
  } catch (err) {
    toast.error('Something went wrong!');
    console.error(err);
    throw err;
  }
};
