const yup = require("yup");


const orderValidatorSchema = yup.object({
    body: yup.object({
        mode: yup.string().required().oneOf(['Card', 'UPI', 'Pay on Delivery']),
        orderPrice:yup.number().required(),
        deliveryCharge:yup.number().required(),
        totalPrice:yup.number().required(),
        cart:yup.array().min(1).of(yup.object().shape({
            productId: yup.string().required(),
            qty: yup.number().required(),
          }).required(),
        ).required(),
        isDelivered:yup.boolean(),
        address:yup.string().min(8).max(300).required(),
    
    })
        
});


module.exports = { orderValidatorSchema };
