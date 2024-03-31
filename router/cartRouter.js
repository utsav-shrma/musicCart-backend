const express = require("express");
const cartRouter = express.Router();
require("dotenv").config();
const User = require("../models/user");
const Product = require("../models/product");

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

    let totalAmount = 0;

    cart.cart.map((info) => {
      totalAmount += info.productId.price * info.qty;
    });

    return res.status(200).json({ totalAmount, ...cart._doc });
  } catch (error) {
    console.log(error);
  }
});

cartRouter.delete("/", async (req, res) => {
  try {
    const userId = req.body.userId;

    const response = await User.updateOne({ _id: userId }, { $set: { cart: []} });

    return res.status(200).json({ message:"success" });
  } catch (error) {
    console.log(error);
  }
});

cartRouter.post("/", async (req, res) => {
  try {
    const userId = req.body.userId;
    const { productId, qty } = req.body;
    let isExceed=false;

    if (!productId || !qty) {
      return res.status(400).json({ message: "bad request" });
    }
    if (typeof qty != "number") {
      return res.status(400).json({ message: "bad request" });
    }
    let product = await Product.findOne({ _id: productId });
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

    //check thatcart size should not exceed inventory
    if (index != -1) {
      //product  Exists
      if (product.inventory >= (cart[index].qty + qty)) {
        cart[index] = { productId, qty: cart[index].qty + qty };
        cartCount += qty;
      } else {
        isExceed=true;
      }
    } else {
      //product doesnt not exists
      if (product.inventory >= qty) {
        cart.push({ productId, qty });
        cartCount += qty;
      } else {
        isExceed=true;
      }
    }
    await User.updateOne({ _id: userId }, { $set: { cart } });

    return res.status(200).json({ message: "success", cartCount ,isExceed});
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
