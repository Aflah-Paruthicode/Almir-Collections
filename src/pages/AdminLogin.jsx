import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { adminLogin } from '../services/AdminAuth';

const AdminLogin = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const submitMailAndPass = async () => {
    try {
      const user = await adminLogin(email,password);
      console.log('admin loged',user.email)
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className=' h-[97vh] bg-[#1e1e1e] font-[poppins]'>
      <section className='w-full fixed bg-[#1f1f1f] shadow-md z-50'>
        <Header />
      </section>
      <section className=' h-full flex justify-center items-center mb-[-4rem]' >
        <div className='flex flex-col items-center justify-center px-12 gap-4 bg-[#1a1a1a] text-white h-[25rem] w-[30rem] rounded-2xl'>
          <div className='w-full'>
            <h1 className='text-4xl mb-5 font-medium'>Admin Login</h1>
            <p>{email}  {password}</p>
          </div>
          <input className='w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg' type="email" placeholder='Email...' onChange={(e) => setEmail(e.target.value)} />
          <input className='w-full h-14 p-3 outline-amber-400 bg-[#343434] rounded-lg' type="password" placeholder='Password...' onChange={(e) => setPassword(e.target.value)} />
          <button className='bg-gradient-to-br from-[#bfa14a] via-[#7f7124] to-[#bfa14a] hover:from-[#b79532] hover:via-[#766715] hover:to-[#b38e21] text-[16px] font-medium px-6 py-2 mt-4 rounded-lg [-webkit-background-clip: text] [-webkit-text-fill-color: transparent]'
             onClick={() => submitMailAndPass()} >Submit</button>
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </div>
  )
}

export default AdminLogin