import User from "../model/model.user.js"; 
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// signup code

export const signup= async(req,res)=>{
    try{ 
       
        const {fullname,email,password,role}=req.body; 
        const user=await User.findOne({email}); 
        if(user){
            return res.status(400).json({message:"user already exists",user});
        };
        const hashedPassword=await bcryptjs.hash(password,10);
        const createUser= new User({
            fullname,
            email,
            password:hashedPassword,role
        });
        await createUser.save();
        // const token =jwt.sign({ userId: createUser._id,role:createUser.role }, process.env.JWT_SECRET, { expiresIn: "30d" });
        res.status(201).json({message:"user created successfully",createUser}); 
    }catch(error){
        console.log("error :"+error);
        res.status(500).json({message:"Internal server error",error});
    };
}; 

// login code

export const login=async(req,res)=>{
    try{
       const {email,password}=req.body;
       const user=await User.findOne({email});
       const isMatch=await bcryptjs.compare(password,user.password);
       if(!user || !isMatch){
        res.status(200).json({message:"invalid username or password"});
       }else{
        const token = jwt.sign({ userId: user._id ,role:user.role}, process.env.JWT_SECRET, { expiresIn: "30d" });
         res.status(200).json({
            message:"login successfull",
            user,token
         });
       }
    }catch(error){
        console.log("Error :",error);
       res.status(500).json({message:"invalid server error"});
    };
};

