const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Product',
    },
    qty: {
        type: Number,
        default: 1,
    },
}); 

const cartModel=mongoose.model("Cart", cartSchema);

module.exports = {cartModel,cartSchema};
