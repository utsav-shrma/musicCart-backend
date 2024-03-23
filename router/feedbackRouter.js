const express = require("express");
const feedbackRouter = express.Router();
const Feedback = require("../models/feedback");
const validator = require("../middleware/validator");
const {feedbackValidatorSchema} =require("../validator/feedbackValidator");

feedbackRouter.post('/',validator(feedbackValidatorSchema),async(req,res)=>{
    
    try{
        const {type,feedback}=req.body;
        let newFeedback = new Feedback({type,feedback,userId:req.body.userId});
        await newFeedback.save();
        res.status(200).json({message:"success"});
    }
    catch(error){
        console.log(error);
    }

});

module.exports = feedbackRouter;