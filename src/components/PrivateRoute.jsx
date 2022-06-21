import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoginPage from "../pages/LoginPage";
import { selectUser } from "../app/features/userSlice";

const PrivateRoute = () => {
  const userAuth = useSelector(selectUser);
  return userAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
