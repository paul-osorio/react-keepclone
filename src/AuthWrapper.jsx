import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth, db } from "./services/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserSettings,
  login,
  logout,
  removeUserSettings,
  selectUser,
} from "./app/features/userSlice";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    console.log(localStorage.getItem("color-theme"));
    onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        const docRef = doc(db, "users", userAuth.uid);
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoURL: userAuth.photoURL,
          })
        );
        getDoc(docRef).then(async (doc) => {
          if (!doc.exists()) {
            await setDoc(docRef, { isDarkMode: false });
          } else {
            dispatch(addUserSettings(doc.data()));
          }
        });
      } else {
        dispatch(logout());
        dispatch(removeUserSettings());
      }
    });
  }, []);
  return children;
};

export default AuthWrapper;
