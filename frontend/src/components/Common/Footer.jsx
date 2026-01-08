import React from 'react'
import { FaMeta } from "react-icons/fa6";
import { IoLogoInstagram } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { FaXTwitter } from "react-icons/fa6";
import { MdCall } from "react-icons/md";


const Footer = () => {
  return (
    <footer className='border-t py-12 mt-4'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0'>
            <div>
                <h3 className='text-lg text-gray-800 mb-4'>Newsletter </h3>
                <p className='text-gray-500 mb-4 '>
                    Be the  first to hear about new products,exclusive events and online Offers.
                </p>
                <p className='font-medium text-sm text-gray-600 mb-6'>Sign up and get 10% off on your first Order.</p>

                <form className='flex'>
                    <input type="email"  placeholder='Enter your email'
                     className='p-2 w-full text-sm border-t border-l border-b border-gray-300 rounded-lg focus:outline-none focus:ring-2
                      focus:ring-gray-500 transition-all'/>
                    <button type='submit' className='bg-black text-white p-4 text-sm rounded-r-md hover:bg-gray-800 transition-all'>Subscribe</button>
                </form>
            </div>
            {/* shop links */}
            <div>
                <h3 className='text-lg text-gray-800 mb-4 '>Shop</h3>
                <ul className='space-y-2 text-gray-500'>
                    <li>
                        <Link to='' className="text-gray-600 transition-colors">Men's Top Wear</Link>
                        <Link to='' className="text-gray-600 transition-colors">Women's Top Wear</Link>
                        <Link to='' className="text-gray-600 transition-colors">Men's Bottom Wear</Link>
                        <Link to='' className="text-gray-600 transition-colors">Women's Bottom Wear</Link>

                    </li>

                </ul>
            </div>
            {/* Support links */}
            <div>
                <h3 className='text-lg text-gray-800 mb-4 '>Support</h3>
                <ul className=' space-y-2 text-gray-500'>
                    <li className='flex flex-col'>
                        <Link to='' className="text-gray-600 transition-colors">Contact Us</Link>
                        <Link to='' className="text-gray-600 transition-colors">About Us</Link>
                        <Link to='' className="text-gray-600 transition-colors">FAQ's</Link>
                        <Link to='' className="text-gray-600 transition-colors">Features</Link>

                    </li>

                </ul>
            </div>

            {/* Follow us */}
            <div>
                <h3 className='text-lg text-gray-800 mb-4'>Follow us</h3>
                <div className='flex items-center space-x-4 mb-6'>
                    <a href='https://www.facebook.com' target='_blank'
                     rel='noopener noreferrer' className='hover:text-gray-700'>
                        <FaMeta className='w-6 h-6'/>
                    </a>
                     <a href='https://www.facebook.com' target='_blank'
                     rel='noopener noreferrer' className='hover:text-gray-700'>
                        <IoLogoInstagram className='w-6 h-6'/>
                    </a>
                     <a href='https://www.facebook.com' target='_blank'
                     rel='noopener noreferrer' className='hover:text-gray-700'>
                        <FaXTwitter className='w-6 h-6'/>
                    </a>
                </div>
                <p className='text-gray-500'>Call Us</p>
                <p>
                    <MdCall className='w-6 h-6 inline-block mr-2 ' />
                    +91 8110087042
                </p>
            </div>
        </div>
        {/* Footer Bottom */}
        <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-400 pt-6'>
            <p className='text-gray-500 text-sm tracking-tighter text-center'>
                &copy; 2025,Daily Deal.All Rights Reserved.

            </p>

        </div>
    </footer>
  )
}

export default Footer