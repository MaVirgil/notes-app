// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJqjxiDLNJiwyRQ3wUn8YMKgbsPTwfif8",
  authDomain: "notebook-a7e48.firebaseapp.com",
  projectId: "notebook-a7e48",
  storageBucket: "notebook-a7e48.firebasestorage.app",
  messagingSenderId: "20818951489",
  appId: "1:20818951489:web:7399059efba1ba0d2c75c0",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getFirestore(firebase);

export { firebase, database };
