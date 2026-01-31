import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);

  // Is the user logged in? We can check if the `user` object exists.
  if (!user) {
    // If not, redirect them to the /login page.
    return <Navigate to="/login" replace />;
  }

  // If they are logged in, render the child route content.
  return <Outlet />;
};

export default ProtectedRoute;
