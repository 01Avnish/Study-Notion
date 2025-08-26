const { findOneAndUpdate } = require("../models/OTP");
const User = require("../models/user");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// resetPasswordToken

exports.resetPasswordToken = async (req , res)=>{
 try{   
    // get email from req body
    const email = req.body.email;
    // check user for this email , email verification 
    const user = await User.findOne({email:email});
    if(!user){
        return res.status(402).json({
            success:false,
            message:"your email is not registered with us "
        });
    }
    //generate token
    const token = crypto.randomUUID();  
    // update user by adding token and expiration time
    const updatedDetails = await User.findOneAndUpdate(
                            {email: email },
                            {
                               token: token,
                               resetPasswordExpires: Date.now() + 5 * 60 * 1000
                            },
                            { new: true } // optional: returns the updated document
                        );

    // create url
    const url = `http://localhost:5173/update-password/${token}`
    // send mail containing url to user
    await mailSender(email,"Password Reset Link",`Password Reset Link\n\n${url}`);
    // return response
    return res.status(200).json({
        success:true,
        message:"password reset link sent to your email "
    })
 }catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"internal server error"
    })
 }
}



// resetPassword

exports.resetPassword = async(req,res)=>{
    try{
    // data fetch
        const {password , confirmPassword , token} = req.body;
    // validation
        if(password.trim() !== confirmPassword.trim()){
            return res.status(401).json({
                success:false,
                message:"password and confirm password must be same ",
            });
        }
    // get userDetails from db using token
        const userDetails = await User.findOne({token:token});
    // if not entry - invalid token
        if(!userDetails){
            return res.status(401).json({
               success:false,
               message:"invalid token",
             });
        }
    // token expires 
        if(userDetails.resetPasswordExpires < Date.now())
        {
            return res.status(401).json({
                success:false,
                message:"token expired"
            })
        }
    // hash password
        const hashedPassword = await bcrypt.hash(password,10);
    // update the password
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true}
        );
    // return response
        await res.status(200).json({
            success:true,
            message:"Password reset successfully"
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        });
    }
}