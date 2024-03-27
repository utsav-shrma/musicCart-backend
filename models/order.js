const mongoose = require("mongoose");
const { Schema } = mongoose;
const {cartSchema}=require('./cart');

const orderSchema = new Schema({
    cart: {
        type: [cartSchema],
    },
    orderPrice: {
        type: Number,
        required:true, 
    },
    deliveryCharge: {
        type: Number,
        required:true, 
    },
    totalPrice: {
        type: Number,
        required:true, 
    },
    orderDate: {
        type: Date,
        default: Date.now 
        
    },
    isDelivered:{
        type:Boolean,
        default:false,
    },
    mode: {
        type: String,
        required: true,
        source: {
            enum: ['Card', 'UPI', 'Pay on Delivery']
          },
    },
    address: {
        type: String,
        required:true, 
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required:true, 
    },
    
});


module.exports = mongoose.model("Order", orderSchema);
