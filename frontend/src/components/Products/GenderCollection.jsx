import React from 'react'
import mensCollection from "../../assets/mens.jpg";
import womensCollection from "../../assets/womens.jpg";
import { Link } from 'react-router-dom';


const GenderCollection = () => {
  return (
    <section className='py-15 px-4 lg:px-0'>
        <div className='container mx-auto flex flex-col md:flex-row gap-8'>
            {/* womens collection */}
            <div className='relative flex-1'>
                <img src={womensCollection} alt='womens-collection' className='w-full h-160 object-cover'/>
                <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-3'>Women's Collection</h2>
                    <Link to='/collections/all?gender=Women' className='text-gray-900 underline'>Shop Now</Link>
                </div>
            </div>
            
        
            {/* mens collection */}
            <div className='relative flex-1'>
                <img src={mensCollection} alt='mens-collection' className='w-full h-160 object-cover'/>
            
                <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-3'>Men's Collection</h2>
                    <Link to='/collections/all?gender=men' className='text-gray-900 underline'>Shop Now</Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default GenderCollection