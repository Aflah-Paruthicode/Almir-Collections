import React from 'react'

const Footer = () => {
  return (
    <div className='w-full h-[20rem] mt-16 text-white flex flex-col items-center justify-center bg-black'>
        <div className='flex gap-3 mb-2'>
            <img className='w-5 h-5' src="/whatsapp.png" alt="" />
            <img className='w-5 h-5' src="/instagram.png" alt="" />
        </div>
        <p className='text-[#bababa]'>We are not affiliated with brands shown. These are replicas(copies) for personal use.</p>
        <p></p>
    </div>
  )
}

export default Footer