const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const mongoose = require("mongoose");

const dbConnect = require("./config/databae");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();

// database connect
dbConnect();
// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)


app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp/",
    })
)

// cloudinary connect 
cloudinaryConnect();

// routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);

app.get("/",(req,res)=>{
    return res.status(200).json({message:"tour server is runing ......."});
})


app.listen(4000,()=>{
    console.log("server is runing on port 4000 this is the server for study notion");
})