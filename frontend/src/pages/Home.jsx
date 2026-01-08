import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollection from '../components/Products/GenderCollection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductsDetails from '../components/Products/ProductsDetails'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import Features from '../components/Products/Features'

const placeholderProducts = [
     {
        _id : 1,
        name : "Product 1",
        price : 1200,
        images : [{url: "https://picsum.photos/500/500?random=1"}]
    },
    {
        _id : 2,
        name : "Product 2",
        price : 1000,
        images : [{url: "https://picsum.photos/500/500?random=2"}]
    },
    {
        _id : 3,
        name : "Product 3",
        price : 600,
        images : [{url: "https://picsum.photos/500/500?random=3"}]
    },
    {
        _id : 4,
        name : "Product 4",
        price : 100,
        images : [{url: "https://picsum.photos/500/500?random=4"}]
    },
    {
        _id : 5,
        name : "Product 5",
        price : 1200,
        images : [{url: "https://picsum.photos/500/500?random=1"}]
    },
    {
        _id : 6,
        name : "Product 6",
        price : 1000,
        images : [{url: "https://picsum.photos/500/500?random=2"}]
    },
    {
        _id : 7,
        name : "Product 7",
        price : 600,
        images : [{url: "https://picsum.photos/500/500?random=3"}]
    },
    {
        _id : 8,
        name : "Product 8",
        price : 100,
        images : [{url: "https://picsum.photos/500/500?random=4"}]
    }

]

const Home = () => {
  return (
    <div>
        <Hero/>
        <GenderCollection/>
        <NewArrivals/>
        {/* Best sellers */}
        <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
        <ProductsDetails/>

        <div className='container mx-auto'>
            <h2 className='text-3xl text-center font-bold mb-4'>
                Top Wears for Women
            </h2>
            <ProductGrid products={placeholderProducts}/>
        </div>
        <FeaturedCollection/>
        <Features/>
    </div>
  )
}

export default Home