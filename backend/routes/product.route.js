import mongoose from 'mongoose';
import express from 'express'
import Product  from '../models/product.model.js';
import protectedRoute from '../middleware/protectRoute.js'
import {admin} from '../middleware/protectRoute.js';

const router = express.Router();

// route POST /api/products
// desc Create a new Product in the database
// access Private/Admin

router.post("/",protectedRoute, admin,async (req,res) =>{
    try {
        const {name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku} = req.body;

            const product = new Product({name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
            user : req.user._id
        } ); // Reference to the admin user who created it

        const createdProduct = await product.save();
        res.status(201).json(createdProduct)
    } catch (error) {
        console.error(error);
        res.status(500).json({error : "Internal server error"})
    }
});

//route PUT /api/products/:id
//description Update an existing product using ID
//access Private/Admin

router.put('/:id',protectedRoute,admin, async(req,res) =>{
    try {
         const {name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku} = req.body;

            //Find Product by ID
            const product = await Product.findById(req.params.id);

            if(product){
                //update product fields
                product.name = name || product.name;
                product.description = description || product.description;
                product.price = price || product.price;
                product.discountPrice = discountPrice || product.discountPrice;
                product.countInStock = countInStock || product.countInStock;
                product.category = category || product.category;
                product.brand = brand || product.brand;
                product.sizes = sizes || product.sizes;
                product.colors = colors || product.colors;
                product.collections = collections || product.collections;
                product.material = material || product.material;
                product.gender = gender || product.gender;
                product.images = images || product.images;
                product.isFeatured = 
                    isFeatured !== undefined ? isFeatured : product.isFeatured;
                product.isPublished = 
                    isPublished !== undefined ? isPublished : product.isPublished;
                product.tags = tags || product.tags;
                product.dimensions = dimensions || product.dimensions;
                product.weight = weight || product.weight;
                product.sku = sku || product.sku;

                //save the updated product

                const updatedProduct = await product.save();
                res.json(updatedProduct)
            }else{
                res.status(404).json({message : "Product Not Found"})
            }
    } catch (error) {
        console.error(error);
        res.status(500).json({error : "Internal Server Error"})
    }
})


// route DELETE /api/products/:id
//desc Delete a product by using id
// access for Admin/private

router.delete('/:id',protectedRoute,admin, async(req,res) =>{
    try {
        const {id} = req.params;

        //Find the product using ID
        const product = await Product.findById(req.params.id);
        if(product){
            //Remove the product in database

            await product.deleteOne();
            res.status(201).json({message : "Product Removed"})
        }else{
            res.status(404).json({ message : "Product Not Found"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error : "Internal server Error"})
    }
});


// route GET  /api/products
// desc get all products with optional query filters
// access Public ---> everyone can access this route
/* 1. Get filters from request
2. Create empty query object
3. For each filter:
     If it exists:
        Add it to query
4. Decide sorting
5. Fetch data using query + sort + limit
6. Return response */


router.get("/", async (req,res)=>{
    try {
        const {collection,size,color,gender,minPrice,maxPrice,
            sortBy,search,category,material,brand,limit} = req.query;
        
            let query = {};

            //Filter Logic

            if(collection && collection.toLocaleLowerCase() !== 'all'){
                query.collections = collection;
            }

             if(category && category.toLocaleLowerCase() !== 'all'){
                query.category = category;
            }
            //split converts string to array which is required for mongodb query
           // from this  material=cotton,linen,silk to ["cotton", "linen", "silk"]


            if(material){
                query.material = {$in  : material.split(",")};
            }

             if(brand){
                query.brand = {$in  : brand.split(",")};
            }

             if(size){
                query.size = {$in  : size.split(",")};
            }

             if(color){
                query.colors = {$in  : [color]};
            }

             if(gender){
                query.gender =  gender;
            };

            if(minPrice || maxPrice){
                query.price = {};
                if(minPrice){
                    query.price.$gte = Number(minPrice);
                }
                 if(maxPrice){
                    query.price.$lte = Number(maxPrice);
                }
            }
            

            if (search){
                query.$or = [
                    {name        : {$regex : search, $options : "i"}},
                    {description : {$regex : search, $options : "i"}},
                ];
            }
            
            // sort Logic
            let sort = {}
            if(sortBy){
                switch (sortBy){
                    case "priceAsc" : 
                        sort = {price : 1};
                        break;
                    case "priceDesc":
                        sort = {price : -1};
                        break;
                    case "popularity" :
                        sort = {rating : -1};
                        break;
                    default : 
                        break;
                }
            }

            //Fetch products and apply sorting and limit

            let products = await Product.find(query).sort(sort).limit(Number(limit) ||  0);
            res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({error : "Internal server error"})
        
    }
});


//route GET /api/products/best-seller
 //desc Retrieve the product with highest rating
 // access Public
 //write a code before the route /api/products/:id otherwise /best-seller will be treated as /:id

 router.get("/best-seller", async(req,res) =>{
    try{
        const bestSeller = await Product.findOne().sort({rating : -1});
        if(bestSeller){
            res.status(200).json(bestSeller);
        }else{
            res.status(404).json({message : "No best Seller Found"})
        }
    }catch (error){
        console.error(error);
        res.status(500).json({error : "Internal Server Error"})
    }
 });


 //for getting the best-seller product from database we can use the following also
/*  Add minimum rating
Product.findOne({ rating: { $gte: 4 } }).sort({ rating: -1 }); */
/* Add popularity logic (better than rating)
.sort({ soldCount: -1, rating: -1 }); */



// route GET /api/products/new-arrivals
//desc Retrieve  latest 8 products -based on creation date
// access Public

router.get('/new-arrivals', async (req,res) =>{
    try {
        // Fetch latest products from database
        const newArrivals = await Product.find().sort({createdAt : -1}).limit(8);
        res.status(200).json(newArrivals);
    } catch (error) {
        console.error(error);
        res.status(500).json({error : "Internal Server Error"});
    }
})


 // @GET /api/products/:id
 //@desc Get a single product by ID
 // access PUBLIC

 router.get('/:id',async (req,res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);

        if(product){
            return res.status(201).json(product)
        }else{
            res.status(404).json({message: "Product Not found"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error : "Internal server Error"});
    }
 });

 // route GET /api/products/similar/:id
 // desc Retrieve similar products based on the current products gender and category
 // access Public

 router.get('/similar/:id', async (req,res) =>{
    try{
        const {id} = req.params;
        console.log(id);
        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({message : "Product not found"});
        }

        const similarProducts = await Product.find({
            _id : { $ne: id },             // Exclude the current product ID
            gender : product.gender,
            category : product.category,
        }).limit(4);

        res.json(similarProducts);
    }catch(error){
        console.error(error);
        res.status(500).json({error : "Internal server error"})

    }
 });

 

export default router;