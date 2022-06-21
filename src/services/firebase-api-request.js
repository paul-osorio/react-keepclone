import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setNotes } from "../app/features/noteHomeSlice";
import { selectUser } from "../app/features/userSlice";
import { db } from "./firebase.config";
import { useSelector } from "react-redux";

export const fetchUnpinnedNotes = () => {
  const user = useSelector(selectUser);
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
