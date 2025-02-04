import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js"

export const handlesignup=async (req,res)=>{
const {fullName, email, password}= req.body;

if(!fullName || !email || !password)
    return res.status(400).json({message:"all fields are required"})

if(password.length<8)
    return res.status(400).json({message:"password must be atleast 8 characters"})

const user= await User.findOne({email})

if(user){
    return res.status(200).json({message:"email already exists"})

}
const salt= await bcrypt.genSalt(10);
const hashedPassword= await bcrypt.hash(password,salt)

const newUser=await  new User({
    fullName,
    email,
    password:hashedPassword
}
)
if(newUser){
    //generating JWT token 
    generateToken(newUser._id, res)
    await newUser.save();
    res.status(201).json({
        fullName:newUser.fullName,
        _id:newUser._id,
        email:newUser.email,
        profilepic:newUser.profilepic
    })
}

}
export const handlelogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      generateToken(user._id, res);
  
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      });
    } catch (error) {
      console.log("Error in login controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
export const handlelogout=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"logged out successfully"})
    } catch (error) {
        console.log("Logout error: ", error);
        res.status(500).json({message:"internal server error"})
    }    
}

export const handleprofileupdate=async(req, res)=>{
    try {
        const {profilepic}= req.body;
        const userId= req.user._id;

        if(!profilepic)
            return res.status(400).json({message:"profile picture is required"})

        const uploadRes=await cloudinary.uploader.upload(profilepic);
        const updatedUser = await User.findByIdAndUpdate(userId,{profilepic:uploadRes.secure_url},{new:true});

        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("error in updating profile");
        return res.status(500).json({message:"Internal server error"})
    }
}

export const checkauth= (req, res)=>{
    try {
        res.status(200).json(req.user);

    } catch (error) {
    console.log("error in check auth controller", error.message)
    res.status(500).json({message:"internal server error"})        
    }
}
