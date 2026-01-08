import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb connected successfully")
    } catch (error) {
        console.error("MongoDB connection failed.",error.message);
         process.exit(1);


    }
    
}

export default connectDB; 
//module.exports = connectDB;

/* import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // ⛔ stop hanging
    });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed ❌");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
 */