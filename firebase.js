// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwsQGB2W2xRULH_PqoiL7WbrYzc9Y1gcI",
  databaseURL: 'https://awesome-a3bfb-default-rtdb.asia-southeast1.firebasedatabase.app/',
  authDomain: "awesome-a3bfb.firebaseapp.com",
  projectId: "awesome-a3bfb",
  storageBucket: "awesome-a3bfb.firebasestorage.app",
  messagingSenderId: "468791074524",
  appId: "1:468791074524:web:41f1956a3552a36e381e19",
  measurementId: "G-H5S7LWR9C0"
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  // If app already exists, use it
  app = firebase.app();
}

export const db = getDatabase(app);