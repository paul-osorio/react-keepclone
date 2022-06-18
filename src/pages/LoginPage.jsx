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
import {
  collection,
  doc,
  getDoc,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const LoginPage = () => {
  const user = useAuth();
  const navigate = useNavigate();
  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  };

  useEffect(() => {
    getRedirectResult(auth).then((result) => {
      if (result) {
        const userRef = doc(db, "users", result.user.uid);
        // const que = query(userCollection, where("uid", "==", user.uid));
        // const doc = getDoc(userRef);
        setDoc(
          userRef,
          {
            settings: {
              isDarkMode: false,
            },
          },
          { merge: true }
        );
      }
    });
    // getRedirectResult(auth)
    //   .then((result) => {
    //     // console.log(result);
    //     if (result) {
    //       const user = result.user;
    //       const userCollection = doc(collection(db, "users"));
    //       const userRef = doc(db, "users", user.uid);
    //       // const que = query(userCollection, where("uid", "==", user.uid));
    //       return getDoc(userRef);
    //     }
    //   })
    //   .then((doc) => {
    //     console.log(doc.data());
    //   });
  }, []);

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
