import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/product.model.js';
import User from './models/user.model.js';
import Cart from './models/cart.model.js';

import products from './data/products.js';

dotenv.config();

//connecting to database

//Function to seed data

const seedData = async() =>{
    try {
        // clear existing data
        await mongoose.connect(process.env.MONGO_URI);
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();


        // Create a default admin User
        const createdUser = await User.create({
            name : "Admin User",
            email : "admin@example.com",
            password : "5678910",
            role : "admin"
        });

        // Assign the default user ID to each product

        const userID = createdUser._id;

        const sampleProducts = products.map((product) =>{
            return(
                {...product,user : userID}
            )
        })

        // Insert the Products into the database

        await Product.insertMany(sampleProducts);
        console.log("Product data seeded Successfully");
        process.exit();
    } catch (error) {
        console.error("Error seeding the data:",error);
        process.exit(1);
        
    }
}

seedData();