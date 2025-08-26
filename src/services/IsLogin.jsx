import { Navigate } from "react-router-dom";
import { auth } from "./firebase-config";

export default function IsLogin({ children }) {
  const user = auth.currentUser;
  if (user) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}