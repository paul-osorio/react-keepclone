import { onAuthStateChanged } from "firebase/auth";

import { useState, useEffect, useContext } from "react";
import { auth, db } from "../services/firebase.config";
// const useAuth = () => useContext(AuthContext);

function useAuth() {
  //
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
    });
    return unSubscribe;
  }, []);
  return currentUser;
}

export default useAuth;
