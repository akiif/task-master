import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    isLoggedIn ? <Outlet /> : <Navigate to="/login" />
  );
}

export default PrivateRoutes;