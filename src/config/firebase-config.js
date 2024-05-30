import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAgiqNG-7aE7DpCuWbS1HLn5qg0UqEa8wk',
  authDomain: 'expense-tracker-b84b4.firebaseapp.com',
  databaseURL: 'https://expense-tracker-b84b4-default-rtdb.firebaseio.com',
  projectId: 'expense-tracker-b84b4',
  storageBucket: 'expense-tracker-b84b4.appspot.com',
  messagingSenderId: '1052432654162',
  appId: '1:1052432654162:web:a35bff973f5a279ce6648b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
