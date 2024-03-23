const yup = require("yup");


const feedbackValidatorSchema = yup.object({
    body: yup.object({
        type: yup.string().required().oneOf(['Bugs','Feedback','Query']),
        feedback: yup.string().min(3).required(),
    
    })
        
});


module.exports = { feedbackValidatorSchema };
