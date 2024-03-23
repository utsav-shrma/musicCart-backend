const express = require("express");
require('dotenv').config();
const cors=require('cors');
const mongodb =require('./config/mongodb');
const authMiddleware =require('./middleware/auth');
const userRouter=require('./router/userRouter');
const productRouter=require('./router/productRouter');
const cartRouter=require('./router/cartRouter');
const feedbackRouter =require('./router/feedbackRouter');
const app=express();
const port=process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use('/product',productRouter);
app.use('/cart',authMiddleware,cartRouter);
app.use('/feedback',authMiddleware,feedbackRouter);
app.use(express.static('assets'));

app.get('/',(req,res)=>{  
    return res.json({
        service:"musicCart backend",
        status:'Active',
        time:new Date()
    });
});

app.listen(port||3000,()=>{
    console.log(`Server is running on port ${port}`);
});