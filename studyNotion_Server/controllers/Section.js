const Section = require("../models/Section");
const Course =  require("../models/Course");
const { model } = require("mongoose");

exports.createSection = async(req , res)=>{
    try{
        // data fetch
        const {sectionName , courseId} = req.body; 
        // data validation 
        if(!sectionName || !courseId)
        {
            return res.status(400).json({
                success:false,
                message:"all fields are required!"
            })
        }
        // create section
        const newSection = await Section.create({sectionName});
        // update course with section onjectid
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                           courseId,
                                           {
                                               $push:{
                                                   courseContent:newSection._id,
                                               }
                                           },
                                           {new:true}
        ).populate({
            path:"courseContent",
            populate:{
                path:"subSection",
                model:"SubSection"
            }
        })
        // return response
        return res.status(200).json({
            success:true,
            message:"section created successfull!",
            updatedCourse: updatedCourseDetails
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"something went wrong!"
        })
    }
}



// update section 
exports.updateSection = async (req , res)=>{
    try{
        // data fetch
        const {sectionName , SectionId} = req.body;
        // validate data
        if(!sectionName || !SectionId){
            return res.status(400).json({
                success:false,
                message:"all fields are required!"
            })
        }
        // update data
        const section = await Section.findByIdAndUpdate(SectionId , {sectionName} , {new:true});
        // return response
        return res.status(200).json({
            success:true,
            message:"section updated successfully!",
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"something went wrong!"
        })
    }
}


// delete section

exports.deleteSection = async (req , res)=>{
    try{
        // get id 
        const {SectionId} = req.params;
        // find by id and delete
        await Section.findByIdAndDelete(SectionId);
        //  do we need to delete the entry from the course schema
        
        // return response
        return res.status(200).json({
            success:true,
            message:"section deleted successfully!"
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"something went wrong!"
        })
    }
}