import jwt from "jsonwebtoken";
import User from "../models/user.model.js"

export const protectRoute = async (req, res, next)=>{
    try {
        const token=req.cookies.jwt;
        if(!token){
            return res.status(200).json({message:"unauthorized user"})
        }

        const decoded= jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded)
            return res.status(200).json({message:"unauthorized user"})

        const user = await User.findById(decoded.userId).select("-password");

        if(!user)
            return res.status(200).json({message:"User not found"})

        req.user=user;

        next();

    } catch (error) {
        console.log("error in authentication middleware")
        res.status(500).json({message:"internal server error"});
    }
}