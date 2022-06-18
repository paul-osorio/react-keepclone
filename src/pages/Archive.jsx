import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import NoteCard from "../components/NoteCard";
import { useAuthContext } from "../Context/AuthProvider";
import { useNoteContext } from "../Context/NoteContext";
import { db } from "../services/firebase.config";
import { AnimatePresence } from "framer-motion";
import EmptyTrashModal from "../components/Modals/EmptyTrash";
import Icon from "../components/Icon";

const Archive = () => {
  const { setAlertName } = useNoteContext();
  const [notes, setNotes] = useState([]);
  const { user } = useAuthContext();
  const [isEmpty, setEmpty] = useState(false);

  const [modalOpen, setModalopen] = useState(false);

  const closeModal = () => setModalopen(false);
  const openModal = () => setModalopen(true);

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

  const checkIfEmpty = () => {
    const checkPinned = query(
      collection(db, "notes"),
      where("uid", "==", user.uid),
      where("status", "==", "archived")
    );

    onSnapshot(checkPinned, (snapshot) => {
      if (snapshot.size > 0) {
        setEmpty(false);
      } else {
        setEmpty(true);
      }
    });
  };

  useEffect(() => {
    setAlertName("");
    checkIfEmpty();

    const q = query(
      collection(db, "notes"),
      where("uid", "==", user.uid),
      where("status", "==", "archived"),
      orderBy("updated_at", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = [];
      snapshot.docs.map((doc) => {
        data.push({
          docID: doc.id,
          title: doc.data().title,
          status: doc.data().status,
          backgroundColor: doc.data().backgroundColor,
          content: doc.data().content,
        });
      });
      setNotes(data);
      // console.log(notes);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="block my-0 mx-auto mt-8">
        {isEmpty ? (
          <div className="w-full flex justify-center items-center mt-20 h-full">
            <div className="">
              <p className="text-center">
                <Icon
                  variant="Symbols"
                  name="archive"
                  className="text-9xl text-gray-200"
                />
              </p>
              <p className="text-center text-xl text-gray-500">
                Your archived notes appear here
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-5">
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
        )}
      </div>
      <AnimatePresence>
        {modalOpen && (
          <EmptyTrashModal
            modalOpen={modalOpen}
            handleClose={closeModal}
            onDelete={deleteAll}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Archive;
