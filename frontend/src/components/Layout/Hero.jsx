import React from 'react'
import heroImg from '../../assets/heroimg.jpg'
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
    <section className='relative'>
        <img src={heroImg} alt='rabbit' className='w-full h-100 md:h-150 lg:h-180 object-cover'/>
        <div className='w-full absolute top-1/3 insight-0 bg-opacity-5 flex items-center justify-center'>
            <div className='text-center text-white p-5'>
                <h1 className='text-4xl md:text-7xl font-bold tracking-tighter uppercase mb-4 transform translate-x-2.5'>
                    Vacation
                    <br/>Ready
                </h1>
                <p className='text-sm tracking-tighter md:text-lg mb-6 text-yellow-500'>
                    Explore Our vacation-ready outfits with fast worldwide shipping.
                </p>
                <Link to="#" className='bg-white text-gray-950 px-6 py-2 rounded-sm text-lg'>
                Shop Now</Link>
                
            </div>
        </div>
    </section>
  )
}

export default Hero