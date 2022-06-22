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
import { db } from "../services/firebase.config";
import { AnimatePresence } from "framer-motion";
import EmptyTrashModal from "../components/Modals/EmptyTrash";
import Icon from "../components/Icon";
import { setAlertName } from "../app/features/noteActionSlice";
import { useDispatch, useSelector } from "react-redux";
import { setTrashNotes } from "../app/features/noteSlice";
import { selectUser } from "../app/features/userSlice";

const Trash = () => {
  const note = useSelector((state) => state.allNote.trashNotes);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
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
      where("status", "==", "trash")
    );

    onSnapshot(checkPinned, (snapshot) => {
      if (snapshot.size > 0) {
        setEmpty(false);
      } else {
        setEmpty(true);
      }
    });
  };

  const deleteAll = () => {
    note.map(async (val) => {
      const docRef = doc(db, "notes", val.docID);
      await deleteDoc(docRef);
    });
    closeModal();
  };

  useEffect(() => {
    dispatch(setAlertName(""));
    checkIfEmpty();

    const q = query(
      collection(db, "notes"),
      where("uid", "==", user.uid),
      where("status", "==", "trash"),
      orderBy("deleted_at", "desc")
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
          created_at: doc.data().created_at,
        });
      });
      dispatch(setTrashNotes(data));
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="block my-0 mx-auto mt-8">
        <div className="flex justify-center italic items-center dark:text-neutral-200">
          Notes in Trash are deleted after 7 days.
          {note.length > 0 && (
            <button
              onClick={() => (modalOpen ? closeModal() : openModal())}
              className="px-5 py-2 rounded active:bg-blue-100 text-blue-400 text-sm hover:bg-blue-400/5 font-medium mx-2"
            >
              Empty Trash
            </button>
          )}
        </div>
        {isEmpty ? (
          <div className="w-full flex justify-center items-center mt-20 h-full">
            <div className="">
              <p className="text-center">
                <Icon
                  variant="Symbols"
                  name="delete"
                  className="text-9xl text-gray-200"
                />
              </p>
              <p className="text-center text-xl text-gray-500">
                No Notes in Trash
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
              {note.map((val, i) => {
                return (
                  <NoteCard
                    key={i}
                    data={val}
                    type="trash"
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

export default Trash;
