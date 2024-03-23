const mongoose = require("mongoose");
const { Schema }= mongoose;

const feedbackSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['Bugs', 'Feedback','Query']
    },
    feedback: {
        type: String,
        required: true,
    },
    userId:{
        type:mongoose.Types.ObjectId,
        required:true,
    }
    

});

module.exports = mongoose.model("Feedback",feedbackSchema);