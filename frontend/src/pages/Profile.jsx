import React from 'react'
import MyorderPage from './MyorderPage'

const Profile = () => {
  return (
    <div className='min-h-screen flex flex-col'>
        <div className='flex-1 container mx-auto p-4  md:p-6'>
            <div className='flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0'>
                {/* Left section */}
                <div className='w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6'>
                <h1 className='text-2xl md:text-3xl font-bold mb-4 '>Jeevitha</h1>
                <p className='text-lg text-gray-600 mb-4'>bejeevitha@gmail.com</p>
                <button className='w-full bg-red-500 text-whitep px-4  py-2 hover:bg-red-600 rounded-lg'>Logout</button>
                </div>
                {/* Right section */}
                <div className='w-full md:w-2/3 lg:3/4'>
                    <MyorderPage/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile