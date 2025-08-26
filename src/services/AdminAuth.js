import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";

export async function adminLogin (email,password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    window.location.href = '/admin'
  } catch(error) {
    alert(error.message);
  }
}
