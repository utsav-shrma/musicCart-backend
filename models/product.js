const mongoose = require("mongoose");
const { Schema }= mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    inventory: {
        type: Number,
        default:0
    },
    reviews: {
        type: Number,
        default:0
    },
    rating: {
        type: Number,
        default:0
    },
    images:{
        type:[String]
    },
    

});

module.exports = mongoose.model("Product",productSchema);