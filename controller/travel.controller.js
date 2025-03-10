import Vehcle from "../model/model.vehcle.js";
import Travel from "../model/model.travel.js"; 

export const createTravelPlan=async(req,res)=>{
     try{
        const {vehcleId,from,to,date,time,noOfSeats,pricePerSeat}=req.body; 
        const vehcle=await Vehcle.findById(vehcleId); 
        const ownerId=req.userId; 
        if(!vehcleId){
            
            return res.status(400).json({message:"hai error here"});
        }
        if(!vehcle || vehcle.owner.toString()!==ownerId){
            
            return res.status(400).json({message:"unauthorized user detected"});
        } 

        const newTravel=new Travel({
            vehcle:vehcleId,
            owner:ownerId, 
            from,
            to,
            date,
            time,
            noOfSeats,
            pricePerSeat,
            passengers:[]
        });
        await newTravel.save()
        res.status(201).json({message:"plan created successfully",newTravel});
        
     }catch(error){
         console.log(error);
         res.status(500).json({message:"internal server error"})
     }
} 


export const updateTravelPlan=async(req,res)=>{
   try{
     const travelId=req.params.travelId; 
     const updatedData=req.body;
     const ownerId=req.userId;
     const travelPlan=await Travel.findById(travelId);

     if(!travelPlan){
        res.status(404).json({message:"travel not found"});
     }
     if(travelPlan.owner.toString()!==ownerId){
        res.status(401).json({message:"you are not the owner of the plan"});
     }
     const newTravelPlan=await Travel.findByIdAndUpdate(travelId,updatedData,{new:true}); 
     res.status(201).json({message:"plan updated successfully",newTravelPlan});
     
   }catch(error){
     console.log(error); 
     res.status(500).json({message:"server error bolthe"})
   }
} 

export const deletePlan=async(req,res)=>{
    try{
       const travelId=req.params.travelId; 
       const ownerId=req.userId; 

       const travelPlan=await Travel.findById(travelId); 
       if(!travelPlan){ 
         
         return res.status(404).json({message:"no travel plan bro"})
       }

       if(travelPlan.owner.toString()!==ownerId){
         return res.status(401).json({message:"you r not owner bro"}); 
        
       }
       await Travel.findByIdAndDelete(travelId);
       res.status(200).json({message:"canceled successfully"});
       
    }catch(error){
       console.log(error) 
       res.status(500).json({message:"server error bhai"});
    }
} 


export const getPlans = async (req, res) => {
   try {
       const ownerId = req.userId;  
       const travelPlans = await Travel.find({ owner: ownerId }); 

       if (!travelPlans.length) {
           return res.status(404).json({ message: "No travel plans found" });
       }

       res.status(200).json({ message: "Travel plans fetched successfully", travelPlans });
   } catch (error) {
       console.error(error);
       res.status(500).json({ message: "Internal server error" });
   }
};


export const getAllTravelPlans = async (req, res) => {
   try {
       const travelPlans = await Travel.find(); 
       res.status(200).json({ travelPlans });
   } catch (error) {
       console.error(error);
       res.status(500).json({ message: "Internal Server Error" });
   }
};