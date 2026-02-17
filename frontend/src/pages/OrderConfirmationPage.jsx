import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/slices/cartSlice';
import { useSelector } from 'react-redux';

/* const checkout  = {
    _id : "1246",
    createdAt: new Date(),
    checkoutItems : [
        {
            productId : "1",
            name : "Jacket",
            color : "black",
            size : "XS",
            price : 1200,
            quantity : 1,
            image : "https://picsum.photos/500/500?random=4"
        },
         {
            productId : "2",
            name : "T-shirt",
            color : "black",
            size : "XL",
            price : 600,
            quantity : 1,
            image : "https://picsum.photos/500/500?random=2"
        },
    ],
    shippingAddress : {
        address : "N0.104,s.v mansion",
        city : "Bangalore",
        country : "India"
    }
} */

const OrderConfirmationPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {checkout} = useSelector((state) => state.checkout);

    //clear the cart when order is confirmed

    useEffect(() =>{
        if(checkout && checkout._id){
            dispatch(clearCart());
            localStorage.removeItem("cart")
        }else{
            navigate("/my-orders")
        }
    },[checkout,dispatch,navigate])

    const calculateEstimateDelivery = (createdAt) =>{
        const orderDate = new Date(createdAt);
        orderDate.setDate(orderDate.getDate() + 10); //add 10 days to the order date
        return orderDate.toLocaleDateString()
    }
  return (
    <div className='max-w-4xl mx-auto p-6 bg-white'>
        <h1 className='text-4xl font-bold text-center text-emerald-700 mb-8'>Thank You for your Order.

        </h1>
        {checkout && (
            <div className='p-6 rounded-lg border'>
                <div className='flex justify-between mb-20'>
                    <div>
                        <h2 className='text-xl font-semibold'> Order ID: {checkout._id}</h2>
                        <p className='text-gray-400'>Order Date: {new Date(checkout.createdAt).toLocaleDateString()}</p>
                    </div>
                    {/* Estimated Deleivery */}
                    <div>
                     <p className='text-emerald-700 text-sm'>
                        Estimated Delivery : {calculateEstimateDelivery(checkout.createdAt)}
                    </p>
                    </div>
                </div>
                {/* ordered items */}
                <div className='mb-20'>
                    {checkout.checkoutItems.map((item) =>{
                        return (
                            <div key={item.productId} className='flex items-center mb-4'>
                                <img 
                                src={item.image}
                                 alt={item.name}
                                 className='w-16 h-16 object-cover rounded-md mr-4'/>
                                 <div>
                                    <h4 className='text-md font-semibold'>{item.name}</h4>
                                    <p className='text-sm text-gray-500'>{item.color} | {item.size}</p>
                                 </div>
                                 <div className='ml-auto text-right'>
                                    <p className='text-md'>${item.price}</p>
                                    <p className='text-sm text-gray-500 '>Qty: {item.quantity}</p>
                                 </div>
                            </div>
                        )
                    })}
                </div>
                {/* Payment and delivery info */}
                <div className='grid grid-cols-2 gap-8'>
                    {/* Payment info */}
                    <div>
                        <h4 className='text-lg font-semibold mb-2'>Payment</h4>
                        <p className='text-gray-600 '>PayPal</p>
                    </div>
                    {/* Delivery info */}
                    <div>
                        <h4 className='text-lg font-semibold mb-2'>Delivery</h4>
                        <p className='text-gray-600 '>{checkout.shippingAddress.address}</p>
                        <p className='text-gray-600 '>
                            {checkout.shippingAddress.city},{" "} {checkout.shippingAddress.country}
                            </p>
                    </div>
                </div>
            </div>
        )}

    </div>
  )
}

export default OrderConfirmationPage