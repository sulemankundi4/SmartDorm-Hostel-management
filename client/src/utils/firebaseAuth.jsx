// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBJi1thzC89OsFmfv73rTczs_n8PWpKfUs',
  authDomain: 'smatdorm.firebaseapp.com',
  projectId: 'smatdorm',
  storageBucket: 'smatdorm.appspot.com',
  messagingSenderId: '683025352346',
  appId: '1:683025352346:web:b5e2e389caf0083e97c123',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
