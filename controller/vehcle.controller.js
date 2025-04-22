import Vehicle from "../model/model.vehcle.js"; 
import User from "../model/model.user.js";

export const addVehcle=async(req,res)=>{ 
    const {vehcleModel,noOfSeats,pricePerSeat,vehcleNumber}=req.body;  
    const ownerId=req.userId; 
    console.log(ownerId)
    try{
        const user=await User.findById(ownerId);  
        
        if(!user){
            return res.status(401).json({message:"unauthorized user"});
        }
        const newVehcle=new Vehicle({
            owner:ownerId,vehcleModel,noOfSeats,pricePerSeat,vehcleNumber
        })
        await newVehcle.save(); 
        res.status(201).json({message:"vehcle registered successfully",newVehcle})
    }catch(error){
        console.log("Error :"+error);
        res.status(500).json({message:"server error",error});
    }
} 

export const getVehcles=async(req,res)=>{ 
    const ownerId=req.userId 
    try{
        const user=await User.findById(ownerId); 
        if(!user){
            return res.status(401).json({message:"unauthorized user"})
        }
        const vehcles=await Vehicle.find({owner:ownerId})
        return res.status(200).json({message:"data fetched successfully",vehcles})
    }catch(error){
        res.status(500).json({message:"error occured"})
        console.log(error)
    }
}