import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { adminLogin } from "../services/AdminAuth";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const submitMailAndPass = async () => {
    try {
      const login = await adminLogin(email, password);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=" h-[97vh] bg-[#1e1e1e] font-[poppins]">
      <section className="w-full fixed bg-[#1f1f1f] shadow-md z-50">
        <Header />
      </section>
      <section className=" h-full flex justify-center items-center mb-[-4rem] py-5 max-sm:px-5">
        <div className="flex flex-col items-center justify-center px-12 gap-4 py-5 bg-[#1a1a1a] text-white h-[25rem] w-[30rem] rounded-2xl max-sm:h-[18rem]">
          <div className="w-full">
            <h1 className="text-4xl mb-5 font-medium max-sm:text-xl max-sm:my-1">Admin Login</h1>
          </div>
          <input
            className="w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg max-sm:h-9 max-sm:rounded-4xl max-sm:text-sm"
            type="email"
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg max-sm:h-9 max-sm:rounded-4xl max-sm:text-sm"
            type="password"
            placeholder="Password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-gradient-to-br from-[#bfa14a] via-[#7f7124] to-[#bfa14a] hover:from-[#b79532] hover:via-[#766715] hover:to-[#b38e21]
             text-[16px] font-medium px-6 py-2 mt-4 rounded-lg [-webkit-background-clip: text] [-webkit-text-fill-color: transparent] max-sm:px-4 max-sm:text-sm max-sm:mt-2"
            onClick={() => submitMailAndPass()}
          >
            Submit
          </button>
          <Link className="text-sm" to={"forgotPass"}>
            forgot password?
          </Link>
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default AdminLogin;
