import express from 'express';
import Product from '../models/product.model.js';
import protectedRoute from '../middleware/protectRoute.js';
import { admin } from '../middleware/protectRoute.js';

const router = express.Router();

// @route GET /api/admin/products
// @desc get all products (Admin only)
// @access Private/admin

router.get("/",protectedRoute,admin,async(req,res)=>{
    try {
        const products = await Product.find({});
            res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal server error"})
    }
});

export default router;