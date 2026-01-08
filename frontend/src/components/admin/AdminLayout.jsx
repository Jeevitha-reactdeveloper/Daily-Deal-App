import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa6';
import Adminsidebar from './Adminsidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    const[isSidebarOpen,setisSidebarOpen] = useState(false);

    const toggleSidebar = () =>{
        setisSidebarOpen(!isSidebarOpen);
    }
  return (
    <div className='min-h-screen flex flex-col md:flex-row relative'>
        {/* Mobile toggle button */}
        <div className='flex md:hidden p-4 bg-gray-900 text-white z-20'>
            <button>
                <FaBars size={25} onClick={toggleSidebar}/>
            </button>
            <h1 className='ml-4 text-xl font-medium '></h1>

        </div>
        {/* overlay for mobile sidebar */}
        {isSidebarOpen && (
            <div className='fixed inset-0  z-10 bg-black bg-opacity-50 md:hidden' 
            onClick={toggleSidebar}>

            </div>
        )}

        {/* sidebar */}
        <div className={`bg-gray-900 w-64 min-h-screen top-0 text-white absolute md:relative transform ${isSidebarOpen ? 
            "translate-x-0" : "-translate-x-full"} transition transform duration-300 
            md:translate-x-0 static md:block z-20`}>
            <Adminsidebar/>
        </div>
        {/* Main content */}
        <div className='flex-1 p-6 overflow-auto'>
            <Outlet/>
        </div>
    </div>
  )
}

export default AdminLayout