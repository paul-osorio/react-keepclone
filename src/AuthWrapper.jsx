import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./services/firebase.config";
import { useDispatch } from "react-redux";
import { login, logout } from "./app/features/userSlice";

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return children;
};

export default AuthWrapper;
