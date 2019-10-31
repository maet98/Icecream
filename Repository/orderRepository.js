const Order = require("../models/Order");
const User = require("../models/User");
const OrderPack = require("../models/OrderPack");
const {getUser} = require("./userRepository");
const {getOrderPack} = require("./orderPackRepository");

module.exports = {
  allOrder: async (req, res) => {
    try {
      const all = await Order.find();
      res.status(200).json(all);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  addOrder: async (req, res) => {
    try {
      const orders = await Order.find({orderPack:req.body.orderPack,orderBy:req.body.orderBy});
      if(orders.length > 0){
        res.status(400).json({message:"Can't insert two orders in the same order pack"});
        return;
      }
      const order = new Order({
        description: req.body.description,
        price: req.body.price,
        PaymentMethod: req.body.PaymentMethod,
        payed: req.body.payed,
        orderPack: req.body.orderPack,
        orderBy: req.body.orderBy
      });
      const savedOrder = await order.save();
      res.status(200).json(savedOrder);
    }
    catch(err){
      res.status(400).json({message: err});
    }
  },
  findOrder: async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderId);
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  //Delete Specific Order
  deleteOrder: async (req, res) => {
    try {
      const removedOrder = await Order.findById(req.params.orderId);
      const orderPack = await OrderPack.findById(removedOrder.orderPack);
      if(removedOrder.orderBy == req.params.userId || orderPack.createdBy == req.params.userId){
        const removed = await removedOrder.remove();
        res.status(200).json(removed);
      }
      else{
        res.status(400).json({message:"You have to be the owner of the order pack or be the one who ordered it."});
      }
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  //Update an Order
  updateOrder: async (req, res) => {
    try {
      const userQuery = getUser(req.params.UserId);
      userQuery.then(async(user)=>{
        if(!user){
          res.status(400).json({message:"User Not found."});
          return;
        }
        const order = await Order.findById(req.params.orderId);
        const orderPack = await OrderPack.findById(order.orderPack);
        if(user._id === order.orderBy){
          if(Date.now() <= orderPack.expirationDate){
            const updatedOrder = await order.update({
                description: req.body.description,
                price: req.body.price,
                PaymentMethod: req.params.PaymentMethod,
                payed: req.params.payed,
                updateAt: Date.now()
              });
            res.status(200).json(updatedOrder);
          }
          else{
            res.status(400).json({message:"The expiration date have already passed."})
          }
        }
        else{
          res.status(400).json({message:"Can't modify the order from other user."});
        }
      })
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
};
