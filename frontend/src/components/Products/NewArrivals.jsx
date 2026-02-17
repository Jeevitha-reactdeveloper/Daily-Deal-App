import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';


const NewArrivals = () => {

    const scrollRef = useRef(null);
    const [isDragging,setIsDragging] = useState(false);
    const [startX,setStartX] = useState(0);
    const [scrollLeft,setScrollLeft] = useState(false);
    const [canScrollRight,setCanScrollRight] = useState(true);
    const [canScrollLeft,setCanScrollLeft] = useState(false);

    const [newArrivals,setNewArrivals] = useState([]);

    useEffect(() =>{
        const fetchNewArrivals = async () =>{
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`);
                setNewArrivals(response.data);
            } catch (error) {
                console.error(error);

            }
        };
        fetchNewArrivals();
    },[]);

    /* const newArrivals = [
        {
            _id : "1",
            name : "Stylish Jacket",
            price : 120,
            images : [
                {
                    url : "https://picsum.photos/500/500?random=1",
                    altText : "stylish Jacket"
                }

            ]
        },
        {
            _id : "2",
            name : "Stylish Jacket",
            price : 120,
            images : [
                {
                    url : "https://picsum.photos/500/500?random=2",
                    altText : "stylish Jacket"
                }

            ]
        },
        {
            _id : "3",
            name : "Stylish Jacket",
            price : 120,
            images : [
                {
                    url : "https://picsum.photos/500/500?random=3",
                    altText : "stylish Jacket"
                }

            ]
        },
        {
            _id : "4",
            name : "Stylish Jacket",
            price : 1000,
            images : [
                {
                    url : "https://picsum.photos/500/500?random=4",
                    altText : "stylish Jacket"
                }

            ]
        },
        {
            _id : "5",
            name : "Stylish Jacket",
            price : 1200,
            images : [
                {
                    url : "https://picsum.photos/500/500?random=5",
                    altText : "stylish Jacket"
                }

            ]
        },
        {
            _id : "6",
            name : "Stylish Jacket",
            price : 1290,
            images : [
                {
                    url : "https://picsum.photos/500/500?random=6",
                    altText : "stylish Jacket"
                }

            ]
        },
        {
            _id : "7",
            name : "Stylish Jacket",
            price : 1200,
            images : [
                {
                    url : "https://picsum.photos/500/500?random=7",
                    altText : "stylish Jacket"
                }

            ]
        },
        {
            _id : "8",
            name : "Stylish Jacket",
            price : 620,
            images : [
                {
                    url : "https://picsum.photos/500/500?random=8",
                    altText : "stylish Jacket"
                }

            ]
        },
    ];
 */
    const handleMouseDown = (e) =>{
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    }

    const handleMouseMove = (e) =>{
        if(!isDragging) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x-startX;
        scrollRef.current.scrollLeft = scrollLeft-walk;

    }

    const handleMouseUpOrLeave = (e) =>{
        setIsDragging(false)

    }

    const scroll = (direction) =>{
        const scrollAmount = direction === "left" ? -300 : 300;
        scrollRef.current.scrollBy({left: scrollAmount,behaviour : "smooth"})
    }

    //update scroll buttons

    const updateScrollButtons = () =>{
        const container = scrollRef.current;

        if(container){
            const leftScroll = container.scrollLeft;
            const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth;

            setCanScrollLeft(leftScroll > 0);
            setCanScrollRight(rightScrollable)
        }
        console.log({
            scrollLeft : container.scrollLeft,
            clientWidth : container.clientWidth,
            containerScrollWidth : container.scrollWidth,
            offsetLeft: scrollRef.current.offsetLeft
        })
    }

    useEffect(()=>{
        const container = scrollRef.current;
        if(container){
            container.addEventListener("scroll",updateScrollButtons);
        }
        updateScrollButtons();
        return () => container.removeEventListener("scroll",updateScrollButtons);
    },[newArrivals])
  return (
    <section className='py-16 px-4 lg:px-0'>
        <div className='relative container mx-auto text-center mb-10' >
            <h2 className='text-3xl font-bold mb-4 text-center'>Explore New Arraivals</h2>
            <p className='text-lg text-gray-600 mb-8 text-center'>Discover the latest styles off the runway,freshly added to keep your wardrobe on the cutting edge of fashion.</p>
            {/* scroll buttons */}

            <div className='absolute right-2 -top-2 flex space-x-2'>
                <button onClick={()=> scroll("left")} disabled = {!canScrollLeft}   
                className={`p-2 rounded  border ${canScrollLeft ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                    <FaAngleLeft className='text-2xl'/>
                </button>
                <button onClick={()=> scroll("right")} disabled = {!canScrollRight}  
                className={`p-2 rounded  border ${canScrollRight ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                    <FaAngleRight className='text-2xl'/>
                </button>
            </div>
        </div>

        {/* scrollable content */}
        <div ref={scrollRef} 
        className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        >
            {newArrivals.map((product)=>{
                return (
                    
                    <div key={product._id} className='min-w-full sm:min-w-1/2 lg:min-w-1/3 relative'>
                        {product.images?.[0]?.url && (

                            <img src={product.images[0]?.url} alt={product.images[0]?.altText}
                             className='w-full h-75 object-cover rounded'
                             draggable="false"
                            />
                        )}
                            <div className='absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg'>
                                <Link to ={`/product/${product._id}`} className="block">
                                    <h4 className='font-medium'>{product.name}</h4>
                                    <p className='mt-1'>${product.price}</p>
                                </Link>

                            </div>
                        
                    </div>
                )

            })}
        </div>
    </section>
  )
}

export default NewArrivals