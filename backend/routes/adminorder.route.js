import express from 'express';
import Order from '../models/Order.model.js';
import protectedRoute from '../middleware/protectRoute.js';
import { admin } from '../middleware/protectRoute.js';

const router = express.Router();

// @route GET /api/admin/orders
// @desc get all orders
// @access Private/admin

router.get("/",protectedRoute,admin,async(req,res) =>{
    try {
        const orders = await Order.find({}).populate("user","name email");
        res.status(200).json(orders)
    } catch (error) {
        console.error(error);
        res.status(500).json({message : "Internal server error"});
    }
});

// @route PUT /api/admin/orders/:id
// @desc update the status of order
// @access private/admin

router.put("/:id",protectedRoute,admin,async(req,res) =>{
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId).populate("user","name");
/*         console.log(order);*/
        if(order){
            order.status = req.body.status || order.status;
            order.isDelivered = req.body.status === "Delivered" ? true  : order.isDelivered;
            order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt;
            const updateOrder = await order.save();
            res.json(updateOrder)
        }else{
            return res.status(404).json({message : "Order Not Found"});
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
});

// @route /api/admin/orders/:id
// @desc delete the order
// @access Private/admin

router.delete("/:id",protectedRoute,admin,async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id);
        if(order){
            await order.deleteOne();
            res.status(200).json({message : "Order Deleted Successfully"});
        }else{
            res.status(404).json({message : "Order Not found"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message : "Internal Server Error"});
    }
})

export default router;