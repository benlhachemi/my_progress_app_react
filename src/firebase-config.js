// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQ5Yjb5ISEeZJjooQx2a6zwpKpi0_KaKQ",
  authDomain: "myprogresspapp.firebaseapp.com",
  projectId: "myprogresspapp",
  storageBucket: "myprogresspapp.appspot.com",
  messagingSenderId: "118757549743",
  appId: "1:118757549743:web:4c4da1cbdc2c5ace8e565a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig;