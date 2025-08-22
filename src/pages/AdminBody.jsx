import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const AdminBody = () => {
  return (
    <div className='w-full bg-[#1e1e1e] font-[poppins]'>
        <section className='w-full fixed bg-[#1f1f1f] shadow-md z-50'>
            <Header />
        </section>
        <div className='w-[70%] h-[90vh] mx-auto'>
            <section className='flex pt-32 justify-center text-[#bababa]'>
            <div className='border p-4 rounded-lg'>
                <h1 className='text-2xl font-bold py-10'>Products</h1>
                <table class="table-fixed">
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>description</th>
                        <th>variants</th>
                        <th>Img</th>
                        <th>Control</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td className='p-2'>Rolex stylish premium watch</td>
                        <td className='p-2'>999 /-</td>
                        <td className='p-2'>Tissot</td>
                        <td className='p-2'>Watch</td>
                        <td className='p-2'>A watch from rolex(replica), perfect one for daily use.</td>
                        <td className='p-2'>1,2,3,4 s,m,l,xl, yellow, blue</td>
                        <td className='p-2'>/img</td>
                        <td className='p-2 flex'>
                            <button className='bg-[#276367] m-1 py-1 px-2 font-medium rounded-md'>Update</button>
                            <button className='bg-[#673727] m-1 py-1 font-medium px-2 rounded-md'>delete</button>
                        </td>
                        </tr>
                        <tr>
                        <td className='p-2'>Rolex stylish premium watch</td>
                        <td className='p-2'>999 /-</td>
                        <td className='p-2'>Tissot</td>
                        <td className='p-2'>Watch</td>
                        <td className='p-2'>A watch from rolex(replica), perfect one for daily use.</td>
                        <td className='p-2'>1,2,3,4 s,m,l,xl, yellow, blue</td>
                        <td className='p-2'>/img</td>
                        <td className='p-2'>Update, delete</td>
                        </tr>
                    </tbody>
                    </table>
            </div>
        </section>
        </div>
        <section className='relative bottom-0'>
            <Footer />
        </section>
    </div>
  )
}

export default AdminBody