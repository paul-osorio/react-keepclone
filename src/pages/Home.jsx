import Icon from "../components/Icon";
import NotesContainer from "../components/NotesContainer";
import FormProvider from "../Context/FormContext";
import { useNoteContext } from "../Context/NoteContext";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../services/firebase.config";
import { useAuthContext } from "../Context/AuthProvider";

const Home = () => {
  const { setAlertName } = useNoteContext();
  const [isEmpty, setEmpty] = useState(false);
  const { user } = useAuthContext();
  useEffect(() => {
    setAlertName("");
    const unsubscribe = () => {
      const checkPinned = query(
        collection(db, "notes"),
        where("uid", "==", user.uid),
        where("status", "==", "default")
      );

      onSnapshot(checkPinned, (snapshot) => {
        if (snapshot.size > 0) {
          setEmpty(false);
        } else {
          setEmpty(true);
        }
      });
    };

    return () => unsubscribe();
  }, []);
  return (
    <>
      <FormProvider />
      {isEmpty ? (
        <div className="w-full flex justify-center items-center mt-10 h-full">
          <div className="">
            <p className="text-center">
              <Icon name="lightbulb" className="text-9xl text-gray-200" />
            </p>
            <p className="text-center text-xl text-gray-500">
              Notes you add appear here
            </p>
          </div>
        </div>
      ) : (
        <NotesContainer />
      )}
    </>
  );
};

export default Home;
