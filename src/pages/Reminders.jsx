import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAlertName } from "../app/features/noteActionSlice";

const Reminders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAlertName(""));
  }, []);

  return <h1>Im Reminders</h1>;
};

export default Reminders;
