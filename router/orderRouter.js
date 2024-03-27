const express = require("express");
const orderRouter = express.Router();
require("dotenv").config();
const Order = require("../models/order");
const Product = require("../models/product");
var ObjectId = require("mongoose").Types.ObjectId;
const validator = require("../middleware/validator");
const {orderValidatorSchema} =require("../validator/orderValidator");


orderRouter.get("/", async (req, res) => {
    try{
        const userId = req.body.userId;
        let response = await Order.find({userId},{name:true,address:true});
        return res.status(200).json(response);

    }
    catch(error){
        console.log(error);
    }
  });

orderRouter.post("/", validator(orderValidatorSchema), async (req, res) => {
  try {
    const userId = req.body.userId;
    let { name,cart, orderPrice, deliveryCharge, totalPrice, mode, address } = req.body;

    let newOrder = new Order({
        name,cart, orderPrice, deliveryCharge, totalPrice, mode, address,userId
    });

    for(const cartItem of cart){
        const { productId, qty } = cartItem;
        const product = await Product.findById(productId);

        if(product.inventory>=qty){
            await Product.findByIdAndUpdate({_id:productId},{$inc:{inventory:-qty}});
        }
        else{
            return res.status(406).json({error:"OUT OF STOCK"});
        }

    }


    await newOrder.save();
    res.status(200).json({ message: "sucess" });
  } catch (error) {
    console.log(error);
  }
});

orderRouter.get("/:id",async (req,res)=>{
    
    
    try{
        let {id}=req.params;
        if(!id || !ObjectId.isValid(id) ){
            return res.status(400).json({error:"bad request"});
        }
        let response = await Order.findOne({_id:id}).populate({
            path: "cart.productId",
            model: "Product",
            select: "name price color images inventory",
          })
          .exec();;

        if (!response) {
            return res.status(404).json({ error: "product not found" });
          }

        return res.status(200).json(response);
    }
    catch(error){
        
        console.log(error);
        
    }
        

}); 

module.exports = orderRouter;
