import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setNotes } from "../app/features/noteHomeSlice";
import { useAuthContext } from "../Context/AuthProvider";
import { db } from "./firebase.config";

export const fetchUnpinnedNotes = () => {
  const { user } = useAuthContext();
  const dispatch = useDispatch();

  const q = query(
    collection(db, "notes"),
    where("uid", "==", user.uid),
    where("status", "==", "default"),
    where("isPinned", "==", false),
    orderBy("updated_at", "desc")
  );

  onSnapshot(q, (snapshot) => {
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
    // setNotes()
    dispatch(setNotes(data));
  });
};
