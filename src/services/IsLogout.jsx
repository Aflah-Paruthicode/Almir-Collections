import { Navigate } from "react-router-dom";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function IsLogout({ children }) {

  const [user,setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(user) => {
      setUser(user)
      setLoading(false)
    })
    return () => unsubscribe();
  },[])

  if(loading) return null;

  if (!user) return <Navigate to="/adminLogin" replace />;

  return children;
}