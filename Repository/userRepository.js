const User = require("../models/User");
const Order = require("../models/Order");
const OrderPack = require("../models/OrderPack");
const {removeOrderPack} = require("../Repository/orderPackRepository");

module.exports = {
  getUser: async (userId) => {
    try{
      const user = await User.findById(userId);
      return user;
    }
    catch(err){
      return err;
    }
  },
  allUser: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  addUser: async (req, res) => {
    try {
      const user = new User(req.body);
      const savedUser = await user.save();
      res.status(200).json(savedUser);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  getOrder: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        res.status(400).json({ message: "User not found" });
      } else {
        var ans = [];
        user.order.forEach(async element => {
          const order = await Order.findById(element);
          ans.push(order);
        });
        var resp = JSON.stringify(ans);
        res.status(200).json(resp);
      }
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  //Find by Id
  findUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.UserId);
      if (!user) {
        res.status(400).json({ message: "User not found" });
        return;
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  //Delete Specific User
  deleteUser: async (req, res) => {
    try {
      const removedOrderPacks = await OrderPack.find({createdBy: req.params.userId});
      var orderPacks = [];
      removedOrderPacks.forEach(orderPack => {
        orderPacks.push(orderPack.delete());
      });
      const removedOrders = await Order.find({orderBy:req.params.userId});
      var orders = [];
      removedOrders.forEach(order => {
        orders.push(order.delete());
      });
      res.json({"user":removeUser, "Orders": orders,"orderPacks":orderPacks});
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  getOrderPacks: async (req, res) =>{
    try{
      const ordersPacks = await OrderPack.find({createdBy:req.params.userId});
      res.status(200).json(ordersPacks);
    }
    catch(err){
      res.status(400).json({message:err});
    }
  },

  //Update a User
  updateUser: async (req, res) => {
    try {
      const userRequest = await User.updateOne({ _id: req.params.userId },
        {
          $set: req.body
        });
      res.status(200).json(userRequest);
    } catch (err) {
      res.status(400).json({ message: "User not found in the DB" });
    }
  },
  aunthentication: async (req, res) =>{
    try{
      const user = await User.findOne({email: req.body.email});
      if(!user){
        res.status(400).json({accepted: false,message:"User is not in the database"});
        return;
      }
      if(user.password === req.body.password){
        res.status(200).json({accepted:true});
      }
      else{
        res.status(400).json({accepted:false, message:"The password don't match with the email"});
      }
    }
    catch(err){
      res.status(400).json({accepted: false,message:err});
    }
  }
};
