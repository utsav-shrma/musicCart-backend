const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'Product',
    },
    qty: {
        type: Number,
        default: 1,
    },
});

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    order: {
        type: [mongoose.Types.ObjectId],
    },
    cart: {
        type: [cartSchema],
    },
});

module.exports = mongoose.model("User", userSchema);
