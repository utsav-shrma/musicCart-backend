const mongoose=require('mongoose');
require('dotenv').config();

const connectString=process.env.DATABASE_CONNECTION_STRING;

const mongoDb=mongoose.connect(connectString)
.then(() => {
    console.log("MongoDB Connected");
  })
.catch((error)=>{
    console.log("MongoDB not connected",error);
});