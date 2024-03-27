const mongoose = require("mongoose");
const { Schema } = mongoose;

const {cartSchema} = require('./cart');

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
