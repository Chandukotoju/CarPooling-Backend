
export const verifyOwner=async(req,res,next)=>{
    if (req.role!=="owner"){
        console.log(req.role)
        return res.status(400).json({message:"only owners can create"})
    } 
    next();
}