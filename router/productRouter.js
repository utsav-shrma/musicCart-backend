const express = require("express");
const productRouter = express.Router();
require("dotenv").config();
const Product = require("../models/product");
const authMiddleware = require("../middleware/auth");
const product = require("../models/product");

productRouter.get("/",async (req,res)=>{

    try{
        let response = await Product.find({},{
            name:true,
            price:true,
            color:true,
            category:true,
            summary:true,
            images:true
            });
        return res.status(200).json(response);

    }
    catch(error){
        console.log(error);
    }
        

}); 

productRouter.get("/id/:id",async (req,res)=>{
    let {id}=req.params;
    
    try{
        if(!id){
            console.log("bad request");
            return res.status(400).json({error:"bad request"});
        }
        let response = await Product.findOne({_id:id});
        if (!response) {
            return res.status(404).json({ error: "product not found" });
          }
          let { inventory, ...newObj } = response._doc;
          newObj.isInStock=(inventory>0?true:false);
        return res.status(200).json(newObj);
    }
    catch(error){
        
        console.log(error);
        
    }
        

}); 


module.exports = productRouter;