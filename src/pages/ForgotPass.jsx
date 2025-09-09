import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase-config";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePasswordReset = async () => {
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(
        "Password reset email sent successfully! Please check your inbox."
      );
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };
  return (
    <div className="h-[97vh] bg-[#1e1e1e] font-[poppins]">
      <section className="w-full fixed bg-[#1f1f1f] shadow-md z-50">
        <Header />
      </section>
      <section className=" h-full flex justify-center items-center mb-[-4rem] py-5">
        <div className="flex flex-col items-center justify-center px-12 gap-4 py-5 bg-[#1a1a1a] text-[#bababa] h-[25rem] w-[30rem] rounded-2xl">
          <div className="w-full">
            <h1 className="text-2xl mb-5 font-medium">Forgot Password</h1>
            <p className="mb-4">
              Enter your email address to receive a password reset link.
            </p>
          </div>
          <input
            className="w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg"
            value={email}
            type="email"
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-gradient-to-br from-[#bfa14a] via-[#7f7124] to-[#bfa14a] hover:from-[#b79532] hover:via-[#766715] hover:to-[#b38e21] text-[16px] font-medium px-6 py-2 mt-4 rounded-lg [-webkit-background-clip: text] [-webkit-text-fill-color: transparent]"
            onClick={handlePasswordReset}
          >
            Send Reset Link
          </button>
          {message && <p className="mt-4 text-green-500">{message}</p>}
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default ForgotPass;
