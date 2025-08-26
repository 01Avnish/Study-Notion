const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true 
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:5*60
    }
})

// an function to send emails

async function sendVerificationEmail(email , otp){
    try{
        const mailResponse = await mailSender(
                email ,
                "verification email from studyNotion",
                emailTemplate(otp));
        console.log("Email sent Successfully ",mailResponse.response);
    }catch(error){
        console.log("error occured while sending mails: ",error);
        throw error;
    }
}

otpSchema.pre("save", async function(next) {
    if(this.isNew){
        await sendVerificationEmail(this.email , this.otp);
    }
    next();
});


module.exports = mongoose.model("OTP",otpSchema);