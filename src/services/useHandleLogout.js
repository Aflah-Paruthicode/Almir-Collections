import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

export const useHandleLogout = async (navigate) => {
  try {
    await signOut(auth);
    navigate("/adminLogin");
  } catch (err) {
    console.error("Logout error:", err);
  }
};
