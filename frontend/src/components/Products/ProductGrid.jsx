import React from 'react'
import { Link } from 'react-router-dom'

const ProductGrid = ({products}) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
        {products.map((product,index)=>{
            return (
                <Link key={index} to={`/product/${product._id}`} className="block">
                    <div className='bg-white p-4 rounded-lg'>
                        <div className='w-full h-96 mb-4'>
                            <img 
                            className='w-full h-full object-cover rounded-lg'
                            src={product.images[0].url} alt={product.images[0].url || product.name}/>
                        </div>
                    </div> 
                    <h3 className='text-sm mb-2 ml-4'>{product.name}</h3>
                    <p className='text-gray-500 ml-4 font-medium tracking-tighter text-sm'>₹ {product.price}</p>
                </Link>

            )
        })}
    </div>
  
    


   )
 }

export default ProductGrid