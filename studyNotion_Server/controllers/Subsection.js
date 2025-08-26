const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();
// create subsection 

exports.createSubsection = async (req, res) =>{
    try {
        // data fetch 
        const {title , description , sectionId} = req.body;
        // extract file/video
        const video = req.files.videoFile;
        // validation 
        if(!title || !description || !sectionId || !video){
            return res.status(400).json({
                success:false,
                message:"All fields are requires in this also",
            })
        }
        // upload to cloudinary 
        const uploadDetails = await uploadImageToCloudinary(video , process.env.FOLDER_NAME);
        // console.log("UPLOAD TO CLOUDINARY:", uploadDetails);
        // create the subsection 
        const subsectionDetails = await SubSection.create({
            title:title,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })
        // update section with this sub section objectId
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                               {$push:{
                                                                subSection:subsectionDetails._id,
                                                               }},
                                                               {new:true}
        ).populate("subSection");
        // return response
        return res.status(201).json({
            success:true,
            message:"Subsection created successfully",
            newSubSection: subsectionDetails, 
            section: updatedSection, 
        })
    }catch(error){
        console.error("CREATE SUBSECTION BACKEND ERROR:", error);
        return res.status(500).json({
            success:false,
            error:error.message,
            message:"internal server error"
        })
    }
}

// update subsection 
exports.updateSubSection = async(req,res)=>{
    try{
        // data fetch 
        const {sectionId , subSectionId , title , description} = req.body;
        const subsection = await SubSection.findById(subSectionId);
        if(!subsection){
            return res.status(404).json({
                success:false,
                message:"Subsection not found",
            });
        }
        // validation
        if(title !== undefined){
            subsection.title = title;
        }
        if(description !== undefined){
            subsection.description = description;
        }
        if(req.files && req.files.videoFile !== undefined){
            const video = req.files.videoFile;
            const uploadDetails = await cloudinary.uploader.upload(
                  video.tempFilePath, 
                { resource_type: "video",       
                  folder: process.env.FOLDER_NAME 
            });
            subsection.videoUrl = uploadDetails.secure_url;
            subsection.timeDuration = `${uploadDetails.timeDuration}`
        }
        await subsection.save();
        // update the section and return it 
        const updateSection = await Section.findById(sectionId).ppopulate(
            "subSection"
        )
        return res.status(200).json({
            success:true,
            message:"Subsection updated successfully",
            data:updateSection
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


// delete subsection 

exports.deleteSubSection = async (req,res)=>{
    try{
        const { subSectionId , sectionId} = req.body;
        await Section.findByIdAndUpdate(
            {_id: sectionId},
            {
                $pull: {SubSection: subSectionId},
            }
        )
        const deleteSubSection = await SubSection.findByIdAndDelete(subSectionId);
        if(!deleteSubSection){
            return res.status(404).json({
                success:false,
                message:"Subsection not found"
            });
        }
        const updatedSection = await Section.findById(sectionId).populate(
            "subSection"
        )
        return res.status(200).json({
            success:true,
            message:"Subsection deleted successfully",
            data:updatedSection
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

