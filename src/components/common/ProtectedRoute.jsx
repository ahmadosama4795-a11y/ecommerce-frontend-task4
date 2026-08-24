import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../../context/AuthContext";
import Loader from "./Loader";

function ProtectedRoute({ allowedRoles }) {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader text="Checking authentication..." />;
  }

  if (!currentUser) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(currentUser.role)
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
