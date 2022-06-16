import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
} from "firebase/auth";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase.config";

const LoginPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      const provider = new GoogleAuthProvider();
      signInWithRedirect(auth, provider);
    } else {
      navigate("/");
    }
  }, []);
};

export default LoginPage;
