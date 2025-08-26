const mongoose = require("mongoose");
require ("dotenv").config;

const dbConnect = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    }catch(error){
        console.log(error);
        console.log("Error in Database Connection");
        process.exit(1);
    }
}

module.exports = dbConnect;