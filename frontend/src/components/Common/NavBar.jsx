import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegUser,FaShoppingBag, } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { useSelector } from 'react-redux';




const NavBar = () => { 
   const [drawerOpen,setDrawerOpen] = useState(false);
   const [navDrawerOpen,setNavDrawerOpen] = useState(false);
   const {cart} = useSelector((state) => state.cart);
   const {user} = useSelector((state) => state.auth);

   const cartItemCount = cart?.products?.reduce((total,product) => total + product.quantity,0) || 0 ;
 
   const toggleNavDrawer = () =>{
    setNavDrawerOpen(!navDrawerOpen)
   }
    const toggleCartDrawer = () =>{
        setDrawerOpen(!drawerOpen);
    }
  return (
  <>
    <nav className='container mx-auto flex items-center justify-between py-4 px-6'>
        <div>
            <Link to="/" className='text-xl md:text-2xl font-medium'>Daily Deal</Link>
        </div>
        <div className='hidden md:flex space-x-6 '>
          <Link to='/collections/all?gender=Men' className='text-gray-700 hover:text-black text-sm font-medium uppercase'>Men</Link>
          <Link to='/collections/all?gender=Women' className='text-gray-700 hover:text-black text-sm font-medium uppercase'>Women</Link>
          <Link to='/collections/all?category=Top Wear' className='text-gray-700 hover:text-black text-sm font-medium uppercase'>Top Wear</Link>
          <Link to='/collections/all?category=Bottom Wear' className='text-gray-700 hover:text-black text-sm font-medium uppercase'>Bottom Wear</Link>

        </div>
        <div className='flex items-center space-x-4'>
          {user && user.role === "admin" && (
          <Link to="/admin" className='block bg-black px-2 rounded text-sm text-white'>Admin</Link>)}
          <Link to='/profile' className='hover:text-black'>
            <FaRegUser className ='h-6 w-6 text-gray-700'/>
          </Link>

            <button className='relative hover:text-black' onClick={toggleCartDrawer}>
              <FaShoppingBag className='h-6 w-6 text-gray-700'/>
              {cartItemCount > 0 && 
              (<span className='absolute -top-1 bg-[#ea2e0e] text-white text-xs rounded-full px-2 py-0.5'>{cartItemCount}</span>
)}
            </button>
              
              <button onClick={toggleNavDrawer} className='md:hidden'>
                <IoMenu className='w-6 h-6 text-gray-700'/>
              </button>

            <div>
              <SearchBar/>
            </div>
        </div>
    </nav>
    <CartDrawer
     drawerOpen={drawerOpen}
     toggleCartDrawer={toggleCartDrawer}
    />

      {/*Mobile Navigation  */} 
    
     <div className={`fixed top-0 left-0 w-3/4  sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ?  "translate-x-0" : "-translate-x-full"}`}>
      <div className='flex justify-end p-3'>
        <button onClick={toggleNavDrawer}>
          <IoMdClose className='w-6 h-6 text-gray-600'/>
        </button>
      </div>
      <div>
        <h2 className='text-2xl font-semibold mb-4 flex justify-center'>Menu</h2>
        <nav className='space-y-4'>
          <Link to ='/collections/all?gender=Men'  className=' text-gray-600 hover:text-black flex justify-center border-b'>Men</Link>
          <Link to='/collections/all?gender=Women'  className=' text-gray-600 hover:text-black flex justify-center border-b'>Women</Link>
          <Link to='/collections/all?category=Top Wear'  className=' text-gray-600 hover:text-black flex justify-center border-b'>Top Wear</Link>
          <Link to='/collections/all?category=Bottom Wear'  className=' text-gray-600 hover:text-black flex justify-center border-b'>Bottom Wear</Link>

        </nav>
      </div>
     
     
    </div>
    
  </>
    
  )
}

export default NavBar