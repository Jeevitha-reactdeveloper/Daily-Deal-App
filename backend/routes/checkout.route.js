import express from 'express';
import Checkout from '../models/CheckOut.model.js';
import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';
import Order from '../models/Order.model.js';
import protectedRoute from '../middleware/protectRoute.js';

const router = express.Router();

// route POST /api/checkout
// @desc Create a new checkout session
// @access Private

router.post('/',protectedRoute, async (req,res) =>{
    const {checkoutItems,shippingAddress,paymentMethod,totalPrice} = req.body;
     console.log("👉 Checkout API HIT");
  console.log("👉 BODY:", req.body);
    if(!checkoutItems || checkoutItems.length === 0){
        return res.status(400).json({message : "no items in checkout"})
    }

    try {
        //create a new checkout session

        const newCheckout = await Checkout.create({
            user : req.user._id,
            checkoutItems : checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus : "Pending",
            isPaid : false
        });
        console.log(`Checkout created for user: ${req.user._id}`);
        res.status(201).json(newCheckout);
    } catch (error) {
        console.error("Error creating checkout session:",error);
        res.status(500).json({message : "server error"})
    }
});

//@route PUT /api/checkout/:id/pay
//@desc Update checkout to mark as paid after successful payment
// @access private

router.put("/:id/pay",protectedRoute, async(req,res)=>{
    const {paymentStatus,paymentDetails} = req.body;

    try {
        const checkout = await Checkout.findById(req.params.id);

        if(!checkout){
            return res.status(404).json({message : "Checkout Not found"});
        }

        if(paymentStatus === "paid"){
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();
            await checkout.save();

            res.status(200).json(checkout);
        }else{
            return res.status(400).json({message : "Invalid Payment Status"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message : "Server Error"})
    }

});

// @route POST /api/checkout/:id/finalize
// @desc Finalize checkout and  convert to an order after payment confirmation
// @access Private

router.post("/:id/finalize",protectedRoute, async(req,res)=>{
    try {
        const checkout = await Checkout.findById(req.params.id);
        console.log("hitted finalize route")
        if(!checkout){
            return res.status(404).json({message : "Checkout not found"});
        }

        if(checkout.isPaid && !checkout.isFinalized){
            // create the final order based on the checkout details

            const finalOrder = await Order.create({
                user : checkout.user,
                orderItems : checkout.checkoutItems,
                shippingAddress : checkout.shippingAddress,
                paymentMethod : checkout.paymentMethod,
                totalPrice : checkout.totalPrice,
                isPaid : true,
                paidAt : checkout.paidAt,
                isDeleivered : false,
                paymentStatus : "paid",
                paymentDetails : checkout.paymentDetails,

            });

            // Mark the checkout as finalized
            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();
            await checkout.save();

            //Delete the cart assosiated with the user
            await Cart.findOneAndDelete({user : checkout.user});
            res.status(201).json(finalOrder);

        }else if (checkout.isFinalized){
            res.status(400).json({message : "Checkout already finalized"});
        }else{
            res.status(400).json({message : "Checkout is not paid"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"})
    }
});

// module.exports = router;
export default router;