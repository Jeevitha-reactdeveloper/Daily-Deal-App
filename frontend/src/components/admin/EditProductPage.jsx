import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductsDetails } from '../../redux/slices/productsSlice';
import axios from 'axios';
import { updateProduct } from '../../redux/slices/adminProductslice';

const EditProductPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const {selectedProduct,loading,error} = useSelector((state)=>state.products);
    const [productData,setProductData] = useState({
        name : "",
        description : "",
        price : 0,
        countInStock : 0,
        sku : "",
        category : "",
        brand : "",
        sizes : [],
        colors : [],
        collections : "",
        material : "",
        gender : "",
        images : [
        /* {
            url : "https://picsum.photos/500/500?random=1",
        },
        {
            url : "https://picsum.photos/500/500?random=2",
        } */
    ]

    })
    
    const[uploading,setupLoading] = useState(false);

    useEffect(()=>{
        if(id){
            dispatch(fetchProductsDetails(id));
        }
    },[dispatch,id]);

    useEffect(()=>{
        if(selectedProduct){
                    console.log("SELECTED PRODUCT IMAGES:", selectedProduct.images);
            setProductData(selectedProduct);
        }
    },[selectedProduct]);

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setProductData((prevData) => ({...prevData,[name] : value}))
    }

    const handleImgUpload = async (e) =>{
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image",file);
        console.log("UPLOAD RESPONSE:", formData);


        try {
            setupLoading(true);
            const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`,formData,{
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            });
            console.log("UPLOAD RESPONSE:", data);
            
        if (data?.url) {
        setProductData((prevData) => ({
            ...prevData,
             images: [...prevData.images, { url: data.url, altText: "" }],
         }));
        } else if (data?.imageUrl) {
         setProductData((prevData) => ({
         ...prevData,
         images: [...prevData.images, { url: data.imageUrl, altText: "" }],
        }));
    } else {
    console.error("No image URL returned from backend");
        }


            /* setProductData((prevData) => ({
                ...prevData,
                images : [...prevData.images,{url:data.imageUrl,altText:""}]
            })); */

            setupLoading(false);
        } catch (error) {
            console.error(error);
            setupLoading(false);
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const cleanedProductData = {
        ...productData,
        images: productData.images.filter(img => img.url)
        };

        dispatch(updateProduct({id,productData:cleanedProductData}));
        navigate("/admin/products");
  };

    if(loading){
        return <p>Loading...</p>
    }

    if(error){
        return <p>Error: {error}</p>
    }
  return (
    <div className='max-w-5xl mx-auto p-6 shadow-md rounded'>
        <h2 className='text-3xl font-bold mb-6 '>Edit Product</h2>
        <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className='mb-6'>
                <label className='block font-semibold mb-2'>Product Name</label>
                <input type='text' 
                name='name' 
                value={productData.name} 
                onChange={handleChange}
                className='w-full border border-gray-300 rounded p-2'
                required/>
            </div>
            {/* Description */}
            <div className='mb-6'>
                <label className='block font-semibold mb-2'>Description</label>
                <textarea  
                name='description' 
                value={productData.description} 
                onChange={handleChange}
                className='w-full border border-gray-300 rounded p-2'
                rows ={4}
                required/>
            </div>
            {/* price input */}
            <div className='mb-6'>
                <label className='block font-semibold mb-2 '>Price</label>
                <input type='number'
                name='price'
                value={productData.price}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded p-2'/>
            </div>
            {/* Count in stock */}
            <div className='mb-6'>
                <label className='block font-semibold mb-2 '>Count In Stock</label>
                <input type='number'
                name='countInStock'
                value={productData.countInStock}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded p-2'/>
            </div>
            {/* SKU */}
            <div className='mb-6'>
                <label className='block font-semibold mb-2 '>SKU</label>
                <input type='number'
                name='sku'
                value={productData.sku}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded p-2'/>
            </div>
            {/* sizes */}
            <div className='mb-6'>
                <label className='block font-semibold mb-2 '>Sizes (comma-seperated)</label>
                <input type='text'
                name='sizes'
                value={productData?.sizes?.join(",") || ""}
                onChange={(e) => setProductData({...productData,sizes : e.target.value.split(",").map((size)=> size.trim())})}
                className='w-full border border-gray-300 rounded p-2'/>
            </div>
            {/* colors */}
            <div className='mb-6'>
                <label className='block font-semibold mb-2 '>Colors (comma-seperated)</label>
                <input type='text'
                name='colors'
                value={productData?.colors?.join(",") || ""}
                onChange={(e) => setProductData({...productData,colors : e.target.value.split(",").map((color)=> color.trim())})}
                className='w-full border border-gray-300 rounded p-2'/>
                {uploading && <p>Uploading Image</p>}
            </div>
            {/* Image upload */}
            <div className='mb-6'>
                <label className='block font-semibold mb-2'>Upload Image</label>
                <input type='file'
                onChange={handleImgUpload}
                className="block w-full text-sm 
               file:mr-4 file:py-2 file:px-4
               file:rounded file:border-0
               file:bg-blue-500 file:text-white
               hover:file:bg-blue-600 cursor-pointer"/>
                <div className='flex gap-4 mt-4'>
                    {productData?.images.map((image,index) =>{
                        return <div key={index}> 
                        <img src={image.url} alt={image.altText || "product image"} 
                        className='w-20 h-20 object-cover rounded shadow-md'/>
                        </div>
                        
                    })}
                </div>
            </div>
            <button type='submit' className='w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 
            transition-colors'>Update  Product</button>
        </form>
    </div>
  )
}

export default EditProductPage