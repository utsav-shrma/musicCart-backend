const express = require("express");
const productRouter = express.Router();
require("dotenv").config();
const Product = require("../models/product");
const authMiddleware = require("../middleware/auth");
const product = require("../models/product");
const {sortKeyMap,priceRangeKeyMap} = require("../utility/uitlityConstants");


productRouter.get("/",async (req,res)=>{

    let query={};
    let sortQuery={};
    let priceKey = req.query.priceKey;
    let category = req.query.category;
    let color= req.query.color;
    let company= req.query.company;
    let sortKey=req.query.sortKey;

    if(sortKey){  
       sortQuery=sortKeyMap[sortKey]; 
    }
    if(priceKey){
        query.price={$gte:priceRangeKeyMap[priceKey].min,$lte:priceRangeKeyMap[priceKey].max}
    }
    if(category){
        query.category=category;
    }
    if(color){
        query.color=color;
    }
    if(company){
        query.company=company;
    }

    try{
        let response = await Product.find(query,{
            name:true,
            price:true,
            color:true,
            category:true,
            summary:true,
            images:true
            }).sort(sortQuery);
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