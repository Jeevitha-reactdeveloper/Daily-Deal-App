import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import userRoutes from './routes/user.route.js'
import productRoute from './routes/product.route.js'
import cartRoute from './routes/cart.route.js'


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
app.use("/api/cart", cartRoute);



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
