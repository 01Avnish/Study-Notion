const mongoose = require("mongoose");

const subsectionSchema = mongoose.Schema({
    title:{ type:String},
    description:{type:String},
    videoUrl:{type:String}
})

module.exports = mongoose.model("SubSection" , subsectionSchema);