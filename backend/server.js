import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/user.route.js';
import productRoute from './routes/product.route.js';
import cartRoutes from './routes/cart.route.js';
import checkoutRoutes from "./routes/checkout.route.js";
import orderRoutes from "./routes/order.route.js";
import uploadRoutes from './routes/upload.route.js';
import subscribeRoutes from './routes/subscriber.route.js';
import adminRoutes from './routes/admin.route.js';
import productAdminRoutes from './routes/productadmin.routes.js';
import orderAdminRoutes from './routes/adminorder.route.js'





const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

//connect to MongoDB
connectDB();

app.get("/",(req,res) =>{
    res.send("Welcome to Daily Deal")
})

// API Routes
app.use('/api/users',userRoutes);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/upload",uploadRoutes);
app.use("/api",subscribeRoutes);
app.use('/api/admin/users',adminRoutes);
app.use("/api/admin/products",productAdminRoutes);
app.use("/api/admin/orders",orderAdminRoutes);






app.listen(PORT, () =>{
    console.log(`Server is running on the port http://localhost:${PORT}`);


})  

/* const startServer = async () => {
  await connectDB(); // ⬅ WAIT for DB
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer(); */

/* const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer(); */
