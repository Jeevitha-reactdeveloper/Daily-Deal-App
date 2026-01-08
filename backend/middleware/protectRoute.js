import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


// Middleware to protect routes

const protectedRoute = async(req,res,next) =>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET);

            req.user = await User.findById(decoded.user.id).select("-password")
            next();
        } catch (error) {
            console.error("Token verification Failed",error);
            res.status(500).json({message : "Unauthorised,token failed"})
        }
    }else{
        res.status(401).json({message : "Unauthorized,no token provided"})
    }
};

//Middleware to check if the user is admin

 export const admin = (req,res,next) =>{
    if(req.user && req.user.role === 'admin'){
        next()
    }else{
        res.status(403).json({message : "Not Authorised as an admin"})
    }
}


export default protectedRoute;