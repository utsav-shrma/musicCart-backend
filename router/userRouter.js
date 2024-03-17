const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const jwtKey = process.env.SECRET_KEY;
const authMiddleware = require("../middleware/auth");
const {userValidatorSchema,loginValidatorSchema} = require("../validator/userValidator");
const validator = require("../middleware/validator");

userRouter.post("/register",validator(userValidatorSchema),async (req, res) => {
    try {
      let { name, email, password, phone } = req.body;
      let isExistingUser = await User.findOne({$or:[ {email: email },{phone:phone}]});
      if (isExistingUser) {
        return res.status(409).json({ message: "user exists" });
      }
      let hashedPassword = await bcrypt.hash(password, 10);
      let newUser = new User({
        name,
        email,
        password: hashedPassword,
        phone,
      });
      await newUser.save();
      let token = await jwt.sign({ userId: newUser._id }, jwtKey);
      res.status(200).json({ name: newUser.name, jwt: token });
    } catch (error) {
      console.log(error);
    }
  }
);

userRouter.post("/login",validator(loginValidatorSchema),async (req,res)=>{
    

    try{
        let {email,password}=req.body;

        let userDetails = await User.findOne({email});
        if(!userDetails){
            return res.status(401).json({ errorMessage: "Invalid Credentials" });
        }

        let isCorrectPassword = await bcrypt.compare(password,userDetails.password);

        if(!isCorrectPassword){
            return res.status(401).json({ errorMessage: "Invalid Credentials" });
        }

        let token = await jwt.sign({ userId: userDetails._id }, jwtKey);
        return res.status(200).json({
            name: userDetails.name,
            message: "login successful",
            jwt: token,
        });
    }
    catch(error){
        console.log(error);

    }
    
});

module.exports = userRouter;
