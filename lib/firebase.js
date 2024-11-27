import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Congfig Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAbRzWaDW1mNIRX1epBhk1mGqvTOg6iwSg",
  authDomain: "schedulenext-9ca94.firebaseapp.com",
  projectId: "schedulenext-9ca94",
  storageBucket: 'schedulenext-9ca94.firebasestorage.app',
  messagingSenderId: '468754448098',
  appId: '1:468754448098:web:2128e115f98e01add268bb',
  measurementId: 'G-CD9PF35HXY',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
