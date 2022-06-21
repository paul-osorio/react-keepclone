import {
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../services/firebase.config";
import googleLogo from "../assets/google.svg";
import { doc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../app/features/userSlice";

const LoginPage = () => {
  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  };

  return (
    <div className="w-screen bg-blue-50 h-screen flex items-center justify-center">
      <button
        onClick={signIn}
        className="bg-white py-3 hover:shadow-lg active:shadow-md border rounded-full px-5  flex  items-center text-black hover:bg-gray-50"
      >
        <img src={googleLogo} alt="" className="mr-3" />
        Sign In With Google
      </button>
    </div>
  );
};

export default LoginPage;
