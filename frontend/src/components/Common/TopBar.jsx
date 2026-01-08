import React from 'react'
import { FaMeta } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


const TopBar = () => {
  return (
    <div className='bg-[#ea2e0e] text-white'>
        <div className='container mx-auto flex justify-between items-center'>
         <div className='hidden md:flex items-center space-x-2'>
            <a href='#' className='hover:text-gray-300'>
            <FaMeta />
            </a>
             <a href='#' className='hover:text-gray-300'>
            <FaInstagram />
            </a>
             <a href='#' className='hover:text-gray-300'>
            <FaXTwitter />
            </a>
        </div>
            <div className='text-sm text-center '>
                <span>We Ship Worldwide - Fast and reliable Shipping</span>
            </div>
            <div className='text-sm hidden md:block'>
                <a href='tel:8110087041' className='hover:"text-gray-300'>
                    +91-3576870465
                </a>
            </div>
        </div>
    </div>
  )
}

export default TopBar