import NoteCard from "./NoteCard";
import Masonry from "react-masonry-css";
import { useEffect, useState, useContext } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../services/firebase.config";
import { AnimatePresence, motion } from "framer-motion";
import { AuthContext, useAuthContext } from "../Context/AuthProvider";

const NotesContainer = ({ children }) => {
  const { user } = useAuthContext();
  const [showPinned, setShowPinned] = useState(false);
  const [pinNotes, setPinNotes] = useState([]);
  const [showOthers, setShowOthers] = useState(false);
  const [notes, setNotes] = useState([]);
  const breakpointColumnsObj = {
    default: 4,
    2560: 9,
    2070: 8,
    1820: 6,
    1575: 5,
    1330: 4,
    1080: 3,
    800: 2,
    600: 1,
  };

  const managePin = () => {
    const checkPinned = query(
      collection(db, "notes"),
      where("uid", "==", user.uid),
      where("status", "==", "default"),
      where("isPinned", "==", true),
      orderBy("updated_at", "desc")
    );

    onSnapshot(checkPinned, (snapshot) => {
      if (snapshot.size > 0) {
        setShowPinned(true);
      } else {
        setShowPinned(false);
      }
      const data = [];
      snapshot.docs.map((doc) => {
        data.push({
          docID: doc.id,
          isPinned: doc.data().isPinned,
          backgroundColor: doc.data().backgroundColor,
          title: doc.data().title,
          content: doc.data().content,
        });
      });
      setPinNotes(data);
    });
  };

  useEffect(() => {
    const q = query(
      collection(db, "notes"),
      where("uid", "==", user.uid),
      where("status", "==", "default"),
      where("isPinned", "==", false),
      orderBy("updated_at", "desc")
    );
    managePin();

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.size > 0) {
        setShowOthers(true);
      } else {
        setShowOthers(false);
      }
      const data = [];

      snapshot.docs.map((doc) => {
        data.push({
          docID: doc.id,
          isPinned: doc.data().isPinned,
          backgroundColor: doc.data().backgroundColor,
          title: doc.data().title,
          content: doc.data().content,
        });
      });
      setNotes(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="block my-0 mx-auto mt-5">
      <div className="mb-5">
        {showPinned && (
          <motion.p
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            className="text-[11px] mx-5 mb-2 text-gray-500"
          >
            PINNED
          </motion.p>
        )}
        {showPinned && (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid "
            columnClassName="my-masonry-grid_column"
          >
            {pinNotes.map((val, i) => {
              return (
                <NoteCard
                  key={i}
                  data={val}
                  docID={val.docID}
                  content={val.content}
                  title={val.title}
                />
              );
            })}
          </Masonry>
        )}
      </div>
      {showPinned && showOthers && (
        <p className="text-[11px] mx-5 mb-2 text-gray-500">OTHERS</p>
      )}

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((val, i) => {
          return (
            <NoteCard
              key={i}
              data={val}
              docID={val.docID}
              content={val.content}
              title={val.title}
            />
          );
        })}
      </Masonry>
    </div>
  );
};

export default NotesContainer;
