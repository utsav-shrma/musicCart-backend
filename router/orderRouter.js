const express = require("express");
const orderRouter = express.Router();
require("dotenv").config();
const Order = require("../models/order");
var ObjectId = require("mongoose").Types.ObjectId;
const validator = require("../middleware/validator");
const {orderValidatorSchema} =require("../validator/orderValidator");


orderRouter.get("/", async (req, res) => {
    try{
        const userId = req.body.userId;
        let response = await Order.find({userId},{cart:false,userId:false});
        return res.status(200).json(response);

    }
    catch(error){
        console.log(error);
    }
  });

orderRouter.post("/", validator(orderValidatorSchema), async (req, res) => {
  try {
    const userId = req.body.userId;
    let { cart, orderPrice, deliveryCharge, totalPrice, mode, address } = req.body;

    let newOrder = new Order({
        cart, orderPrice, deliveryCharge, totalPrice, mode, address,userId
    });
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
