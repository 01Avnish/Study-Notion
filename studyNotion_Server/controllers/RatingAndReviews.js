const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

// create Rating
exports.createRating = async (req, res) =>{
    try{
        // get user id
        const userId = req.user.id;
        // fetchdata from reqbody
        const {courseId , rating , review} = req.bodyc
        // check if user id enrolled or not
        const course = await Course.findById(courseId);
        if(!course) return res.status(404).json({msg : "Course not found"})
        const enrolled = course.studentsEnrolled.includes(userId);
        if(!enrolled){
            return res.status(409).json({
                success:false,
                message:"the user is not enrolled in the course"
            })
        }
        // check if user already reviewed the course
        const reviewed = await RatingAndReview.findOne({user:userId , Course:courseId});
        if(reviewed){
            return res.status(402).json({
                success:false,
                message:"the user already reviewed the course"
            })
        }
        // create rating and reviews
        const ratingAndReview = new RatingAndReview({
            user:userId ,
            rating,
            review ,
            Course:courseId
        });
        // save rating and reviews
        await ratingAndReview.save();
        // update course rating and reviews 
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
                                    {
                                        $push: {
                                            ratingAndReviews: ratingAndReview._id,
                                        }
                                    },
                                    {new: true});
        // return the response
        return  res.status(200).json({success:true , message:"Rating and review created successfully"})
    }catch(error){
        console.log(error);
        return res.status(500).json({success:false , message:"Internal server error"})
    }
}

// getAverageRating
exports.getAverageRating = async(req , res)=>{
    try{
        // get the course id
         const courseId = req.body.courseId;
        // calculate the average rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    Course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null ,
                    averageRating: {$avg: "$rating"},
                }
            }
        ]);
        if(result.length > 0)
        {
            return res.status(200).json({
                    success:true,
                    averageRating: result[0].averageRating,
            });
        };
        return res.status(200).json({
                success:true,
                message:'Average Rating is 0, no ratings given till now',
                averageRating:0,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    };
}


// getAllRating and reviews

exports.getAllRating = async(req,res)=>{
    try{
        const allReviews = await RatingAndReview.find({})
                                 .sort({rating: "desc"})
                                 .populate(
                                    {
                                        path:"User",
                                        select:"firstName lastName  email image",
                                    }
                                 )
                                 .populate(
                                    {
                                        path:"Course",
                                        select:"courseName",
                                    },
                                 )
        return res.status(200).json({
            success:true,
            data:allReviews,
            message:"All reviews fetched successfully",
        });             
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"some server error has occured "
        })
    }
}