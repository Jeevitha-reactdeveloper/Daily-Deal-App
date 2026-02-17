import express from 'express';
import Order from '../models/Order.model.js';
import protectedRoute from '../middleware/protectRoute.js';

const router = express.Router();

//@route GET /api/orders/my-orders
//@desc Get logged-in user's orders
//@access Private

router.get('/my-orders',protectedRoute, async(req,res) =>{
    try {
        // Find orders for the authenticated user
        const orders = await Order.find({user: req.user._id}).sort({createdAt : -1});
        //sort by most recent orders
        res.json(orders);

        
    } catch (error) {
        console.error(error);
        res.status(500).json({message : "Server Error"});
    }
});

// @route GET /api/orders/:id
// @desc get order details by id
// @access Private

router.get("/:id",protectedRoute, async(req,res) =>{
    try {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"

        );

        if(!order){
            return res.status(404).json({message : "Order Not found"});
        }

        // if we find order send it as response
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
});

export default router;