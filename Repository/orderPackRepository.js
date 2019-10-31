const Order = require("../models/Order");
const User = require("../models/User");
const OrderPack = require("../models/OrderPack");

module.exports = {
  allOrderPacks: async (req, res) => {
    try {
      const all = await OrderPack.find().populate('createdBy','name');
      res.status(200).json(all);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  /**
   * addOrderPack
   */
  addOrderPack: async (req, res) => {
    try {
      const orderPack = new OrderPack({
        name: req.body.name,
        createBy: req.body.createBy,
        expirationDate: req.body.expirationDate
      });
      const savedOrderPack = await orderPack.save();
      res.status(200).json(savedOrderPack);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  findOrderPack: async (req, res) => {
    try {
      const orderPack = await OrderPack.findById(req.params.OrderPackId);
      const orders = await Order.find({ordePackId:req.params.OrderPackId});
      if(!orderPack){
        res.status(400).json({messge:"OrderPack not found"});
        return;
      }
      res.json({"orderPack":orderPack,"orders":orders});
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  getOrderPack: async (orderPackId) =>{
    try{
      const orderPack = await OrderPack.findById(orderPackId);
      return orderPack;
    }
    catch(err){
      return null;
    }
  },
  getOrders: async(req,res) =>{
    try{
      const orders = await Order.find({orderPackId: req.params.OrderPackId});
      res.status(200).json(orders);
    }
    catch(err){
      res.status(400).json({message:err});
    }
  },
  removeOrderPack: async(ordePackId) => {
    try {
      const removeOrder = await Order.find({orderPack:orderPackId});
      var removed = [];
      removeOrder.forEach(order => {
        removed.push(order.delete());
      });
      const removeOrderPack = await OrderPack.findByIdAndDelete(orderPackId);
      res.status(200).json({removedOrderPack,removed});
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  //Delete Specific Order
  deleteOrderPack: async (req, res) => {
    try {
      const orderPack = await OrderPack.findById(req.params.orderPackId);
      if(orderPack.createdBy == req.params.userId){
        const removeOrder = await Order.find({orderPack:req.params.orderPackId});
        var removed = [];
        removeOrder.forEach(order => {
          removed.push(order.delete());
        });
        const removeOrderPack = await OrderPack.findByIdAndDelete(req.params.orderPackId);
        res.status(200).json(removeOrderPack);
      }
      else{
        res.status(400).json({message:"You have to be the owner of the order Pack for delete it."});
      }
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  /**
   * identificar el nombre del colaborador que creo la lista de ordenes
   */
  findCreatorName: async(req,res) =>{
    try{
      const orderPack = await OrderPack.findById(req.params.orderPackId);
      const user = await User.findById(orderPack.createdBy);
      res.status(400).json({"Creator":user.name});
    }
    catch(err){
      res.status(400).json({"message":err});
    }
  },
  /**
   * Update a OrderPack
   */
  updateOrderPack: async (req, res) => {
    try {
      const orderPack = await OrderPack.findById(req.params.orderPackId);
      if(orderPack.createdBy == req.params.userId){
        var UpdatedOrder = await orderPack.updateOne({$set:req.body});
        res.json(UpdatedOrder);
      }
      else{
        res.status(400).json({"message":"Only the owner of the list can modify it."});
      }
    } catch (err) {
      res.status(400).json({ "message": err });
    }
  }
};
