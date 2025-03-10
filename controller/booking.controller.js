import Travel from "../model/model.travel.js"; 

export const bookSeat=async(req,res)=>{
    try{
        const {travelId,seatsToBook}=req.body; 
        const passengerId=req.userId; 
        const travelPlan=await Travel.findById(travelId); 

        if(!travelPlan){
          
            return res.status(404).json({message:"travel plan not found"}); 
        } 

        if (travelPlan.noOfSeats<seatsToBook){
            
           return res.status(400).json({message:"seats not available"}) 
        } 
        let existingUser=null;
        if(travelPlan.passengers.length>0){
             existingUser=travelPlan.passengers.find((item)=>item.passengerId.toString()===passengerId);
        }

        if(existingUser){
            existingUser.seatsBooked=parseInt(existingUser.seatsBooked)+parseInt(seatsToBook);
        }else{
            travelPlan.passengers.push({passengerId,seatsBooked:seatsToBook});
        }

        travelPlan.noOfSeats-=seatsToBook; 
        await travelPlan.save();
        res.status(200).json({message:"seat booked succesfully",travelPlan});
    }
    catch(error){
       console.log(error); 
       res.status(500).json({message:"server error seat"});
    }
} 

export const cancelSeat=async(req,res)=>{
    try{
       
        const {travelId,seatsToCancel}=req.body; 
        
        const travelPlan=await Travel.findById(travelId); 
        const passengerId=req.userId;

        if(!travelPlan){
            return res.status(404).json({message:"travel plan not found"}); 
        } 
        const passengerIndex=travelPlan.passengers.findIndex((item)=>item.passengerId ?.toString()===passengerId); 
        if(passengerIndex==-1){
            return res.status(404).json({message:"not found the passenger"});
        };

        const passengerBookings=travelPlan.passengers[passengerIndex]; 
        if(seatsToCancel>passengerBookings.seatsBooked){
            return res.status(400).json({message:"can not cancell more seats"});
        }
        passengerBookings.seatsBooked-=seatsToCancel 
        if(passengerBookings.seatsBooked===0){
            travelPlan.passengers.splice(passengerIndex,1);
        } 
    
        travelPlan.noOfSeats+=seatsToCancel; 
        await travelPlan.save();
        res.status(200).json({message:"seat cancelled successfully",travelPlan})
    }catch(error){
        console.log(error)
        res.status(500).json({message:"server not responding"});
    }
}

export const getBookings = async (req, res) => {
    try {
        const passengerId = req.userId; // Logged-in passenger

        // 🔍 Find all travel plans where the passenger has booked seats
        const bookings = await Travel.find({
            "passengers.passengerId": passengerId,
        }).select("from to date time pricePerSeat passengers");

        if (!bookings.length) {
            return res.status(404).json({ message: "No bookings found for this passenger" });
        }

        // 🔹 Extract passenger-specific booking details
        const passengerBookings = bookings.map(travel => {
            const passengerDetails = travel.passengers.find(
                p => p.passengerId.toString() === passengerId
            );

            return {
                travelId: travel._id,
                from: travel.from,
                to: travel.to,
                date: travel.date,
                time: travel.time,
                pricePerSeat: travel.pricePerSeat,
                seatsBooked: passengerDetails.seatsBooked,
            };
        });

        res.status(200).json({ message: "Bookings retrieved successfully", bookings: passengerBookings });

    } catch (error) {
        console.error("Error in getBookings:", error);
        res.status(500).json({ message: "Server error, please try again" });
    }
};
