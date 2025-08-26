const mongoose = require("mongoose");
const user = require("./user");
const Course = require("./Course");

const ratingAndReviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        required:true
    },
    Course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true,
        index:true
    },
});

module.exports = mongoose.model("RatingAndReview",ratingAndReviewSchema);