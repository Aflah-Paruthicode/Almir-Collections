import { useState } from "react";
import { auth, googleProvider } from "../services/firebase-config";
import { createUserWithEmailAndPassword, signInWithPopup,signOut } from "firebase/auth";

const Auth = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    console.log(auth?.currentUser?.photoURL)
    const SignIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth,email,password);
        } catch (err) {
            console.error(err);
        }
    }
    const SignInWithGoogle = async () => {
        try {
            await signInWithPopup(auth,googleProvider);
        } catch (err) {
            console.error(err);
        }
    }
    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    }

  return (
    <div>
        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email..." />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password..." />
        <button onClick={SignIn}>Sign in</button>
        <button onClick={SignInWithGoogle}>Sign in with google</button>
        <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Auth