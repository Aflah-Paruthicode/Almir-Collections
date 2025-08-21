import { db } from "../services/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { ToastContainer, toast } from 'react-toastify';


export async function adminLogin(email,password) {

    const docRef = doc(db, "admins", import.meta.env.VITE_DB_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const admin = docSnap.data();

      if (email === admin.email) {
        const isMatch = await bcrypt.compare(password, admin.password);
        if (isMatch) {

          alert("✅ Admin logged in!");
          
        } else {
          alert("❌ Wrong password");
        }
      } else {
        alert("❌ Email not found");
      }
    } else {
      alert("No such admin!");
    }
}