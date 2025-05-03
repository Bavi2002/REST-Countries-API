// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//     apiKey: "AIzaSyAO9wIZC6O3VXcVPqolwk227ySrcmJWtCU",
//     authDomain: "country-explorer-e8109.firebaseapp.com",
//     databaseURL: "https://country-explorer-e8109-default-rtdb.firebaseio.com",
//     projectId: "country-explorer-e8109",
//     storageBucket: "country-explorer-e8109.firebasestorage.app",
//     messagingSenderId: "816081085815",
//     appId: "1:816081085815:web:3ca3171b53f0bcdedeed72",
//     measurementId: "G-TS8FEJ0JTK"
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAO9wIZC6O3VXcVPqolwk227ySrcmJWtCU",
  authDomain: "country-explorer-e8109.firebaseapp.com",
  databaseURL: "https://country-explorer-e8109-default-rtdb.firebaseio.com",
  projectId: "country-explorer-e8109",
  storageBucket: "country-explorer-e8109.firebasestorage.app",
  messagingSenderId: "816081085815",
  appId: "1:816081085815:web:3ca3171b53f0bcdedeed72",
  measurementId: "G-TS8FEJ0JTK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
