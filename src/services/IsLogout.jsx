import { Navigate } from "react-router-dom";
import { auth } from "./firebase-config";

export default function IsLogout({ children }) {
  const user = auth.currentUser;
  if (!user) {
    return <Navigate to="/adminLogin" replace />;
  }

  return children;
}