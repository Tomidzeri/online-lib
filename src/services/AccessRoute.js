
import { Route, Navigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";

function AccessRoute({ element, allowedRoles }) {
  const { userRole } = useRole();

  if (!allowedRoles.includes(userRole)) {
    // Redirect or show an access denied message
    return <Navigate to="/access-denied" />;
  }

  return <Route element={element} />;
}

export default AccessRoute;
