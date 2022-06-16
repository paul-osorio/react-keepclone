import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../services/firebase.config";

const SignOut = () => {
  useEffect(() => {
    signOut(auth);
  }, []);
};

export default SignOut;
