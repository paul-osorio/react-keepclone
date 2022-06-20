import Container from "./Container/ViewNoteContainer";
import Icon from "./Icon";
import TextareaAutosize from "react-textarea-autosize";
import { useState, useRef } from "react";
import AddNoteButton from "./Buttons/AddNoteButton";
import ColorPicker from "./ColorPicker";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { motion, AnimatePresence } from "framer-motion";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase.config";
import { useNoteColor } from "../hooks/useNoteColor";
import { useDispatch } from "react-redux";
import {
  setActionHistory,
  setActionID,
  setAlertName,
} from "../app/features/noteActionSlice";
import DeleteForeverModal from "./Modals/DeleteForever";

const ViewNote = ({ handleClose, data }) => {
  const dispatch = useDispatch();
  const [showPalette, setShowPalette] = useState(false);
  const [isPinned, setPinned] = useState(data.isPinned);
  const [showMore, setShowMore] = useState(false);
  const divColor = useNoteColor(data.backgroundColor);
  const docRef = doc(db, "notes", data.docID);
  const color = data.backgroundColor;
  const palleteRef = useRef();
  const [modalOpen, setModalopen] = useState(false);

  const closeModal = () => setModalopen(false);
  const openModal = () => setModalopen(true);

  useOnClickOutside(palleteRef, () => setShowPalette(false));

  const onPin = async () => {
    setPinned(!isPinned);
    handleClose();
    await updateDoc(docRef, {
      isPinned: !isPinned,
      updated_at: serverTimestamp(),
    });
  };

  const changeContent = async (e) => {
    await updateDoc(docRef, {
      content: e.target.value,
    });
  };
  const changeTitle = async (e) => {
    await updateDoc(docRef, {
      title: e.target.value,
    });
  };

  const restoreNote = async () => {
    await updateDoc(docRef, {
      status: "default",
      updated_at: serverTimestamp(),
    });
    dispatch(setAlertName("RestoreNote"));
    dispatch(setActionHistory("Restored"));
    dispatch(setActionID(data.docID));
  };
  const deleteForever = async () => {
    await deleteDoc(docRef);
    closeModal();
  };

  const changeColor = async (e) => {
    await updateDoc(docRef, {
      backgroundColor: e.target.value,
    });
  };
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
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Container onClick={handleClose} divColor={divColor}>
        <motion.div className="max-h-[550px] overflow-auto notescrollbar">
          <div className="flex w-full px-4">
            <input
              type="text"
              placeholder="Title"
              readOnly={data.status === "trash"}
              value={data.title}
              onChange={changeTitle}
              className="w-full outline-none placeholder:text-gray-500  text-xl"
              style={{
                backgroundColor: divColor,
              }}
            />
            {data.status !== "trash" && (
              <button
                onClick={onPin}
                className="group hover:bg-gray-500/10 flex items-center rounded-full p-1"
              >
                <Icon
                  variant={isPinned ? "Icon" : ""}
                  name="push_pin"
                  className="text-gray-600 group-hover:text-black"
                />
              </button>
            )}
          </div>
          <div className=" mt-3 px-4">
            <TextareaAutosize
              value={data.content}
              style={{
                backgroundColor: divColor,
              }}
              onChange={changeContent}
              placeholder="Take a note..."
              className="w-full outline-none  resize-none placeholder:text-gray-600"
              autoFocus
              readOnly={data.status === "trash"}
            />
          </div>
        </motion.div>
        {data.status !== "trash" ? (
          <motion.div className="flex items-center justify-between px-4">
            <motion.div className="flex items-center space-x-3">
              <AddNoteButton name="add_alert" />
              <AddNoteButton name="person_add" />
              <motion.div className="relative">
                <AddNoteButton
                  name="palette"
                  onClick={(e) => {
                    setShowPalette(!showPalette);
                  }}
                />
                {showPalette && (
                  <div
                    ref={palleteRef}
                    style={{
                      boxShadow:
                        "0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)",
                    }}
                    className="absolute flex h-14 rounded-lg items-center space-x-2 bg-white p-2 z-10"
                  >
                    <ColorPicker
                      color="default"
                      checked={color === "default"}
                      onChange={changeColor}
                    />
                    <ColorPicker
                      color="red"
                      checked={color === "red"}
                      onChange={changeColor}
                    />
                    <ColorPicker
                      color="orange"
                      checked={color === "orange"}
                      onChange={changeColor}
                    />
                    <ColorPicker
                      color="yellow"
                      checked={color === "yellow"}
                      onChange={changeColor}
                    />
                    <ColorPicker
                      color="green"
                      checked={color === "green"}
                      onChange={changeColor}
                    />
                    <ColorPicker
                      color="teal"
                      checked={color === "teal"}
                      onChange={changeColor}
                    />
                    <ColorPicker
                      color="blue"
                      checked={color === "blue"}
                      onChange={changeColor}
                    />
                    <ColorPicker
                      color="darkblue"
                      checked={color === "darkblue"}
                      onChange={changeColor}
                    />
                    <ColorPicker
                      color="purple"
                      checked={color === "purple"}
                      onChange={changeColor}
                    />
                    <ColorPicker
                      color="pink"
                      checked={color === "pink"}
                      onChange={changeColor}
                    />
                    <ColorPicker
                      color="brown"
                      checked={color === "brown"}
                      onChange={changeColor}
                    />
                    <ColorPicker
                      color="gray"
                      checked={color === "gray"}
                      onChange={changeColor}
                    />
                  </div>
                )}
              </motion.div>
              <AddNoteButton name="image" />
              <AddNoteButton name="archive" />
              <div className="relative">
                <AddNoteButton
                  onClick={() => setShowMore(!showMore)}
                  name="more_vert"
                  variant="Icon"
                />
                {showMore && (
                  <div className="absolute">
                    <div className="bg-white py-2 w-44 rounded-lg shadow-gray-500">
                      <button
                        onClick={onDelete}
                        className="hover:bg-gray-500/10 w-full py-1 text-start px-3 text-sm text-gray-700"
                      >
                        Delete note
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <AddNoteButton name="undo" />
              <AddNoteButton name="redo" />
            </motion.div>
            <motion.div className="">
              <motion.button
                className="hover:bg-gray-500/10 py-1 px-5"
                type="button"
                onClick={handleClose}
                // onClick={submitForm}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <div className="flex items-center px-4 justify-between">
            <div className="flex items-center">
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
            <button
              className="hover:bg-gray-500/10 py-1 px-5"
              type="button"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        )}
      </Container>
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

export default ViewNote;
