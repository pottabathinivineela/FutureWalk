// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtbllle0EnTzG9OEX0QidkX9l47a6VWxw",
  authDomain: "futurewalk-d2dcf.firebaseapp.com",
  projectId: "futurewalk-d2dcf",
  storageBucket: "futurewalk-d2dcf.firebasestorage.app",
  messagingSenderId: "74213242011",
  appId: "1:74213242011:web:b68ddfda4a9331cbea023e",
  measurementId: "G-JLTHZB06X8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;