import mongoose from "mongoose"; 

const travelSchema=mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"User"},
    vehcle:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Vehcle"},
    from:{type:String,required:true},
    to:{type:String,required:true},
    date:{type:Date,required:true},
    time:{type:String,required:true},
    pricePerSeat:{type:Number,required:true},
    noOfSeats:{type:Number,required:true},
    passengers:[{passengerId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},seatsBooked:{type:Number,required:true}}]
}); 

const Travel=mongoose.model("travel",travelSchema); 

export default Travel; 
