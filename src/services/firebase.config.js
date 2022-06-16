// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLpblm9AbpI1JByAtEaIlHWV34R0BN3m0",
  authDomain: "keep-clone-react-458c7.firebaseapp.com",
  projectId: "keep-clone-react-458c7",
  storageBucket: "keep-clone-react-458c7.appspot.com",
  messagingSenderId: "897787922124",
  appId: "1:897787922124:web:c79ae69607e05aa6cca469",
  measurementId: "G-CWPV23S1RS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
