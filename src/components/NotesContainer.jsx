import NoteCard from "./NoteCard";
import Masonry from "react-masonry-css";
import { useEffect } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../services/firebase.config";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthContext } from "../Context/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import {
  setNotes,
  setPinNotes,
  setShowOthers,
  setShowPinned,
} from "../app/features/noteHomeSlice";

const NotesContainer = () => {
  const { user } = useAuthContext();
  const notes = useSelector((state) => state.noteHome.notes);
  const pinNotes = useSelector((state) => state.noteHome.pinNotes);
  const showOthers = useSelector((state) => state.noteHome.showOthers);
  const showPinned = useSelector((state) => state.noteHome.showPinned);

  const dispatch = useDispatch();

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
        dispatch(setShowPinned(true));
      } else {
        dispatch(setShowPinned(false));
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
      dispatch(setPinNotes(data));
    });
  };

  useEffect(() => {
    managePin();

    const q = query(
      collection(db, "notes"),
      where("uid", "==", user.uid),
      where("status", "==", "default"),
      where("isPinned", "==", false),
      orderBy("updated_at", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.size > 0) {
        dispatch(setShowOthers(true));
      } else {
        dispatch(setShowOthers(false));
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
      dispatch(setNotes(data));
    });
    return () => unsubscribe();
  }, []);

  return (
    <AnimatePresence>
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
                return <NoteCard key={i} data={val} />;
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
            return <NoteCard key={i} data={val} />;
          })}
        </Masonry>
      </div>
    </AnimatePresence>
  );
};

export default NotesContainer;
