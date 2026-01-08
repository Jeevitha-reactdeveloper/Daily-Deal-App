import React from 'react'

const OrderManagement = () => {

    const orders = [
    {
        _id : 345859,
        user : {
            name : "John Doe",

        },
        totalPrice : 400,
        status : "Processing",

    }
    ]

    const handleStatusChange = (orderID,status) =>{
        console.log({_id:orderID,status})
    }
  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h2 className='text-2xl font-bold mb-6'>Order Management</h2>
        <div className='overflow-x-auto shadow-md rounded-md '>
            <table className='min-w-full text-left text-gray-500'>
                <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                    <tr>
                        <th className='p-2'>Order ID</th>
                        <th className='p-2'>Customer</th>
                        <th className='p-2'>Total Price</th>
                        <th className='p-2'>Status</th>
                        <th className='p-2'>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? 
                    ( orders.map((order) =>{
                        return(
                            <tr key={order._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                                <td className='p-3 font-medium text-gray-900 whitespace-nowrap'>#{order._id}</td>
                                <td className='p-3'>{order.user.name}</td>
                                <td className='p-3'>{order.totalPrice}</td>
                                <td className='p-3'>
                                    <select 
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order._id,e.target.value)}
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                                         focus:border-blue-500 block p-2'>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>

                                    </select>
                                </td>
                                <td className='p-3'>
                                    <button onClick={() => handleStatusChange(order._id,"Delivered")}
                                    className='bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 '>Mark As Delivered</button>
                                </td>

                            </tr>
                        )
                    }))
                     : (<tr>
                        <td colSpan={5} className='text-center text-gray-500'>No Orders found.</td>
                     </tr>)}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default OrderManagement