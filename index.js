const express = require("express");
require('dotenv').config();
const cors=require('cors');
const mongodb =require('./config/mongodb');
const authMiddleware =require('./middleware/auth');
const userRouter=require('./router/userRouter');

const app=express();
const port=process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(userRouter);


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