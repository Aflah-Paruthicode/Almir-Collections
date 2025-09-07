import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return ( <div className='h-[100vh] w-full bg-[#1f1f1f] '>
    <section className='w-full fixed bg-[#1f1f1f] shadow-md z-50'>
        <Header />
    </section>
    <section className='flex justify-center h-[90vh] items-center'>
        <div className='text-[#bababa]'>
        <h1 className='text-6xl mb-2 font-bold'>404 Error</h1>
        <p className='tracking-wider'>This page is not found!</p>
        <Link to={'/'} 
        className='bg-gradient-to-br transition-colors inline-flex from-[#bfa14a] via-[#7f7124] to-[#bfa14a] hover:from-[#b79532] hover:via-[#766715] hover:to-[#b38e21] text-[16px] px-4 py-2 my-2 font-semibold rounded-lg [-webkit-background-clip: text] [-webkit-text-fill-color: transparent] '>Go To Home</Link>
        </div>
    </section>
    <section className='bg-[#1f1f1f]'>
        <Footer />
    </section>
  </div>
  )
}

export default ErrorPage