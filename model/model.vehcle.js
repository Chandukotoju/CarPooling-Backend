import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vehcleNumber:{type:Number,required:true,unique:true},
    pricePerSeat: { type: Number, required: true },
    noOfSeats: { type: Number, required: true }, 
    vehcleModel:{type:String,required:true}
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle; 
