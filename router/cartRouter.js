const express = require("express");
const cartRouter = express.Router();
require("dotenv").config();
const User = require("../models/user");

cartRouter.get("/", async (req, res) => {
  try {
    const userId = req.body.userId;

    const cart = await User.findOne({ _id: userId }, { cart: true })
      .populate({
        path: "cart.productId",
        model: "Product",
        select: "name price color images inventory",
      })
      .exec();

    if (!cart) {
      return res.status(404).json({ error: "NOT FOUND" });
    }

    let totalAmount=0;

    cart.cart.map((info)=>{
        totalAmount+=(info.productId.price*info.qty);
    })

    return res.status(200).json({totalAmount,... cart._doc});

  } catch (error) {
    console.log(error);
  }
});

cartRouter.post("/", async (req, res) => {
  try {
    const userId = req.body.userId;
    const { productId, qty } = req.body;

    if (!productId || !qty) {
      return res.status(400).json({ message: "bad request" });
    }
    if (typeof qty != "number") {
      return res.status(400).json({ message: "bad request" });
    }

    let response = await User.findOne({ _id: userId });
    let cart = response.cart;
    let cartCount = 0;
    let index = -1;
    cart.find(function (element, i) {
      if (element.productId == productId) {
        index = i;
      }

      cartCount += element.qty;
    });

    if (index != -1) {
      cart[index] = { productId, qty: cart[index].qty + qty };
    } else {
      cart.push({ productId, qty });
    }

    await User.updateOne({ _id: userId }, { $set: { cart } });

    cartCount += qty;
    return res.status(200).json({ message: "success", cartCount });
  } catch (error) {
    console.log(error);
  }
});

cartRouter.get("/count", async (req, res) => {
  try {
    const userId = req.body.userId;
    let response = await User.findOne({ _id: userId }, { cart: true });
    if (response) {
      let count = 0;
      response.cart.map((item) => {
        count += item.qty;
      });
      return res.status(200).json({ cartCount: count });
    } else {
      return res.status(404).json({ error: "NOT FOUND" });
    }
  } catch (error) {
    console.log(error);
  }
});


module.exports = cartRouter;
