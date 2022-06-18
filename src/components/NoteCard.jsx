import AddNoteButton from "./Buttons/AddNoteButton";
import Icon from "./Icon";
import { useState, useRef } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase.config";
import { useNoteContext } from "../Context/NoteContext";
import DeleteForeverModal from "./Modals/DeleteForever";
import { AnimatePresence } from "framer-motion";

const NoteCard = ({ type = "default", data }) => {
  const { setAlertName } = useNoteContext();
  const [showMore, setShowMore] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setShowMore(false));
  const docRef = doc(db, "notes", data.docID);
  const [modalOpen, setModalopen] = useState(false);

  const closeModal = () => setModalopen(false);
  const openModal = () => setModalopen(true);

  const onDelete = async () => {
    try {
      await updateDoc(docRef, {
        status: "trash",
        isPinned: false,
        deleted_at: serverTimestamp(),
      });
      setShowMore(false);
      if (data.isPinned) {
        setAlertName("UnpinnedAndTrash");
      } else {
        setAlertName("Trashed");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const deleteForever = async () => {
    await deleteDoc(docRef);
    closeModal();
  };

  const restoreNote = async () => {
    await updateDoc(docRef, {
      status: "default",
      updated_at: serverTimestamp(),
    });
    setAlertName("RestoreNote");
  };

  const archived = async () => {
    await updateDoc(docRef, {
      status: "archived",
      updated_at: serverTimestamp(),
    });
    setAlertName("ArchivedNote");
  };
  const unarchived = async () => {
    await updateDoc(docRef, {
      status: "default",
      updated_at: serverTimestamp(),
    });
    setAlertName("UnarchivedNote");
  };
  const onPin = async () => {
    if (data.isPinned) {
      await updateDoc(docRef, {
        isPinned: false,
        updated_at: serverTimestamp(),
      });
    } else {
      await updateDoc(docRef, {
        isPinned: true,
        updated_at: serverTimestamp(),
      });
    }

    // console.log(data.isPinned);
  };

  return (
    <>
      <div
        className={
          "group  item border mb-3 rounded-lg p-4 hover:shadow hover:shadow-gray-300 relative"
        }
        style={{
          userSelect: "none",
          backgroundColor:
            data.backgroundColor === "default"
              ? "white"
              : "#" + data.backgroundColor,
        }}
      >
        {type === "default" && (
          <div className="opacity-0 transition duration-300 group-hover:opacity-100">
            <Icon
              variant="Icon"
              className="absolute -top-3 -left-3"
              name="check_circle"
            />
          </div>
        )}
        <div className="flex relative">
          <span className="font-medium text-[16px] leading-6 w-11/12 text-gray-800">
            {data.title}
          </span>
          {type === "default" && (
            <button
              onClick={onPin}
              className="opacity-0 absolute -right-2 -top-3 hover:bg-gray-500/10 flex items-center p-2 rounded-full transition duration-300 group-hover:opacity-100"
            >
              <Icon
                variant={data.isPinned ? "Icon" : ""}
                className="text-slate-600"
                name="push_pin"
              />
            </button>
          )}
        </div>
        <div className="text-sm whitespace-pre-wrap tracking-[0.2px]">
          {data.content}
        </div>
        {type === "default" ? (
          <div
            className={
              (showMore ? "" : "opacity-0 group-hover:opacity-100") +
              " flex py-1 justify-between transition duration-300"
            }
          >
            <AddNoteButton name="add_alert" />
            <AddNoteButton name="person_add" />
            <AddNoteButton name="palette" />
            <AddNoteButton name="image" />
            {data.status === "archived" ? (
              <AddNoteButton name="unarchive" onClick={unarchived} />
            ) : (
              <AddNoteButton name="archive" onClick={archived} />
            )}
            <div className="relative" ref={ref}>
              <AddNoteButton
                onClick={() => setShowMore(!showMore)}
                name="more_vert"
                variant="Icon"
              />
              {showMore && (
                <div
                  style={{
                    boxShadow:
                      "0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)",
                  }}
                  className="absolute  left-auto -top-10 z-10 block rounded -translate-x-2/4  bg-white py-2"
                >
                  <button
                    onClick={onDelete}
                    className="block w-28 text-gray-600 hover:bg-gray-100 py-2 text-sm"
                  >
                    Delete Note
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            className={
              (showMore ? "" : "opacity-0 group-hover:opacity-100") +
              " flex py-1 transition duration-300"
            }
          >
            <AddNoteButton
              name="delete_forever"
              variant="Icon"
              onClick={openModal}
            />
            <AddNoteButton
              name="restore_from_trash"
              variant="Icon"
              onClick={restoreNote}
            />
          </div>
        )}
      </div>

      <AnimatePresence>
        {modalOpen && (
          <DeleteForeverModal
            modalOpen={modalOpen}
            handleClose={closeModal}
            onDelete={deleteForever}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default NoteCard;
