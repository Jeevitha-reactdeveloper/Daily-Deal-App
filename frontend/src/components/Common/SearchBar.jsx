import React, { useState } from 'react'
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";


const SearchBar = () => {

    const [searchTerm,setsearchTerm] = useState("");
    const [isOpen, setisOpen] = useState(false);

    const handleSearchToggle = () =>{
        setisOpen(!isOpen);
    }

    const handleSearch = (e) =>{
        e.preventDefault();
        setisOpen(false)
    }
  return (
    <div onSubmit={handleSearch} className={`flex items-center justify-center transition-all duration-300 ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"} `}>
    {isOpen ? (
        <form className='relative flex items-center justify-center w-full'>
            <div className='relative'>
                <input type='text'
                placeholder='Search' 
                value={searchTerm}
                className='bg-gray-100 p-2 rounded-full focus:outline-none placeholder:text-gray-700'
                onChange={(e) =>setsearchTerm(e.target.value)}/>

                <button type='submit' className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600  hover:text-gray-800'>
                    <HiMiniMagnifyingGlass className='w-6 h-6 '/>
                </button>

                <button type='button' 
                className='absolute -right-8 top-2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'
                onClick={handleSearchToggle}
                >
                <IoMdClose className='w-6 h-6' />
                </button>
            </div>
        </form> )
        : (
        <button onClick={handleSearchToggle}>
            <HiMiniMagnifyingGlass className='w-6 h-6 text-gray-700' />

        </button>
    )}
    </div>
  )
}

export default SearchBar