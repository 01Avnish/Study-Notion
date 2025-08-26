const {instance} = require("../config/razorpay"); 
const Course = require("../models/Course");
const User = require("../models/user");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail.js");
const { default: mongoose } = require("mongoose");

// capture the payment and initate the razorpay order

exports.capturePayment = async(req , res)=>{
    try{
        // get courseId and UserID
        const courseId  = req.body;
        const userId = req.User.id;
        // validation
        if(!courseId ){
            return res.status(400).json({message : "Course ID is required"});
        }
        let course;
        try{
            course = await Course.findById(courseId);
            if(!course){
                return res.status(404).json({message : "Course not found"});
            }
            // if user has already bought the course
            const uid = new mongoose.Types.ObjectId(String(userId));
            if(course.studentsEnrolled.includes(uid)){
                return res.status(400).json({message : "You have already enrolled in this course"});
            }
        }catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message : "Error while fetching course details"
            })
        }
        // order create
        const amount = course.price;
        const currency = "INR";
        const options = {
            amount:amount*100,
            currency,
            receipt:Math.random(Date.now()).toString(),
            notes:{
                courseId:courseId,
                userId,
            }
        }
        try{
            // initiate the payment using razorPay
            const paymentResponse = await instance.orders.create(options);
            return res.status(200).json({
                success:true,
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                thumbnail:course.thumbnail,
                orderId: paymentResponse.currency,
                amount:paymentResponse.amount
            })
        }catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:"Could not initiate order!",
            });
        }

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error while fetching course details"
        })
    }
};

// verify signature of razorpay and server

exports.verifySignature = async (req,res) =>{
     const webhookSecret = "12345678";
     const signature = req.header('X-Razorpay-Signature');
     const shasum = crypto.createHmac("sha256",webhookSecret);
     shasum.update(JSON.stringify(req.body));
     const digest = shasum.digest('hex');
     if(signature === digest){
        console.log("Payment verified");

        const {courseId , userId} = req.body.payload.payment.entity.notes;
        try{
            const enrolledCourse = await Course.findOneAndUpdate(
                                         {_id:courseId},
                                         {$push:{studentsEnrolled:userId}},
                                         {new:true},
            )
            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"Course not found"
                })
            }
            console.log(enrolledCourse);
            // find the student and update the course enrolled list 
            const enrolledStudent = await User.findOneAndUpdate(
                                          {_id:userId},
                                          {$push:{courses:courseId}},
                                          {new:true}
            )

            // mail send to the student about the confirmation 
            const emailResponse = await mailSender(
                                    enrolledStudent.email,
                                    "this is the enrooled course",
                                    "congratulation you are enrolled",

            );
            return res.status(200).json({
                success:true,
                message:"Course enrolled successfully",
            });
        }catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:"Error while enrolling the course"
            })
        }
     }
};

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body

  const userId = req.user.id

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const enrolledStudent = await User.findById(userId)

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}