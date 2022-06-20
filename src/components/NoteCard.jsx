import AddNoteButton from "./Buttons/AddNoteButton";
import Icon from "./Icon";
import { useState, useRef } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import {
  deleteDoc,
  deleteField,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../services/firebase.config";
import DeleteForeverModal from "./Modals/DeleteForever";
import { AnimatePresence } from "framer-motion";
import { useNoteColor } from "../hooks/useNoteColor";
import { motion } from "framer-motion";
import ViewNote from "./ViewNote";
import { useDispatch } from "react-redux";
import {
  setActionHistory,
  setActionID,
  setAlertName,
  setPrevUpdatedDate,
} from "../app/features/noteActionSlice";
import Palette from "./NoteCard/Palette";
import { setViewNoteDate } from "../app/features/noteFormActionsSlice";

const NoteCard = ({ type = "default", data }) => {
  const dispatch = useDispatch();
  const divColor = useNoteColor(data.backgroundColor);
  const [showPalette, setShowPalette] = useState(false);

  const [showMore, setShowMore] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setShowMore(false));
  const docRef = doc(db, "notes", data.docID);
  const [modalOpen, setModalopen] = useState(false);
  const [openNote, setOpenNote] = useState(false);

  const closeModal = () => setModalopen(false);

  const openModal = () => setModalopen(true);

  const onDelete = async () => {
    try {
      setShowMore(false);
      if (data.isPinned) {
        dispatch(setAlertName("UnpinnedAndTrash"));
        dispatch(setActionHistory("UnpinnedAndTrash"));
      } else {
        dispatch(setAlertName("Trashed"));
        if (data.status === "archived") {
          dispatch(setActionHistory("ArchivedTrashed"));
        } else {
          dispatch(setActionHistory("Trashed"));
        }
      }
      await updateDoc(docRef, {
        status: "trash",
        isPinned: false,
        deleted_at: serverTimestamp(),
      });
      dispatch(setActionID(data.docID));
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
      deleted_at: deleteField(),
    });
    dispatch(setAlertName("RestoreNote"));
    dispatch(setActionHistory("Restored"));
    dispatch(setActionID(data.docID));
  };

  const archived = async () => {
    await updateDoc(docRef, {
      status: "archived",
      updated_at: serverTimestamp(),
    });

    if (data.isPinned) {
      dispatch(setAlertName("UnpinnedAndArchivedNote"));
      dispatch(setActionHistory("UnpinnedAndArchived"));
    } else {
      dispatch(setAlertName("ArchivedNote"));
      dispatch(setActionHistory("Archived"));
    }
    dispatch(setActionID(data.docID));
    dispatch(setPrevUpdatedDate(data.updated_at));
  };
  const unarchived = async () => {
    await updateDoc(docRef, {
      status: "default",
      isPinned: false,
      updated_at: serverTimestamp(),
    });
    dispatch(setAlertName("UnarchivedNote"));
    dispatch(setActionHistory("Unarchived"));
    dispatch(setActionID(data.docID));
  };
  const onPin = async (e) => {
    e.stopPropagation();
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
  };

  return (
    <>
      <motion.div
        onMouseLeave={() => setShowPalette(false)}
        selectedId={data.docID}
        className={
          (openNote && "invisible") +
          " group  item border mb-2 rounded-lg px-4 pt-4 pb-3 hover:shadow hover:shadow-gray-300 relative"
        }
        style={{
          userSelect: "none",
          backgroundColor: divColor,
          zindex: 90,
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
        <motion.div
          className=""
          onClick={() => {
            dispatch(setViewNoteDate(data.created_at));
            setOpenNote(true);
          }}
        >
          <div className="flex relative">
            {type === "default" && (
              <button
                onClick={onPin}
                className="opacity-0 absolute -right-3 -top-3 hover:bg-gray-500/10 flex items-center p-2 rounded-full transition duration-300 group-hover:opacity-100"
              >
                <Icon
                  variant={data.isPinned ? "Icon" : ""}
                  className="text-slate-600"
                  name="push_pin"
                />
              </button>
            )}
            <span className="font-medium text-[16px] leading-6 w-11/12 text-gray-800">
              {data.title}
            </span>
          </div>
          <div className="text-sm whitespace-pre-wrap break-words tracking-[0.2px]">
            {data.content}
          </div>
        </motion.div>
        {type === "default" ? (
          <div
            className={
              (showMore ? "" : "opacity-0 group-hover:opacity-100") +
              " flex pt-3 justify-between transition duration-300"
            }
          >
            <AddNoteButton name="add_alert" />
            <AddNoteButton name="person_add" />
            <Palette
              showPalette={showPalette}
              setShowPalette={setShowPalette}
              data={data}
              docRef={docRef}
            />
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
      </motion.div>

      <AnimatePresence>
        {modalOpen && (
          <DeleteForeverModal
            modalOpen={modalOpen}
            handleClose={closeModal}
            onDelete={deleteForever}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openNote && (
          <ViewNote
            data={data}
            handleClose={() => {
              setOpenNote(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default NoteCard;
