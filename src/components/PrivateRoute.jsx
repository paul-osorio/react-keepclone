import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoginPage from "../pages/LoginPage";

// const PrivateRoute = ({ children }) => {
//   let { user } = useAuth();

//   if (user) {
//     return <Outlet />;
//   } else {
//     return <Navigate to="/login" />;
//   }
// };

const PrivateRoute = () => {
  const user = useAuth();

  return user === "undefined" ? (
    <h1>Loading.....</h1>
  ) : user ? (
    <Outlet />
  ) : (
    <LoginPage />
  );
};

export default PrivateRoute;
