import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute({ allowedRole }) {
  const { currentUser } = useSelector((state) => state.user);

  // ❌ Not logged in
  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  // 🔐 Role check ONLY if allowedRole exists
  if (allowedRole) {
    const role =
      currentUser?.role ||
      currentUser?.user?.role;

    if (!role || role.toLowerCase() !== allowedRole.toLowerCase()) {
      return <Navigate to="/signin" replace />;
    }
  }

  return <Outlet />;
}
