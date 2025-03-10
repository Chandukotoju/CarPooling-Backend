import express from "express";
import mongoose from 'mongoose';
import userRoute from "./route/user.route.js";
import vehcleRoute from "./route/vehcle.route.js";
import travelRoute from "./route/travel.route.js";

import cors from "cors";
import dotenv from "dotenv"; 

dotenv.config();
const MONGO_URI=process.env.MONGO_URI; 
const PORT =process.env.PORT || 4000;

const app = express()
app.use(express.json());
const port = 3000

try{
    mongoose.connect(MONGO_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("mongodb connected");
  }catch(error){
     console.log("Error:",error)
  }; 
  app.use(cors({
    origin: "https://car-pooling-app-git-main-chandus-projects-cdac10b0.vercel.app", // Your frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true
  }));

app.use("/user",userRoute); 
app.use("/vehicle",vehcleRoute);
app.use("/travel",travelRoute);


app.listen(PORT,"0.0.0.0", () => {
  console.log(`Example app listening on port ${process.env.JWT_SECRET}`)
});