const Order = require("../models/Order");
const User = require("../models/User");
const OrderPack = require("../models/OrderPack");

module.exports = {
  /**
   * @author Miguel Estevez
   * @returns Una arreglo de lista de ordenes
   */
  allOrderPacks: async (req, res) => {
    try {
      const all = await OrderPack.find().populate('createdBy','name');
      res.status(200).json(all);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  /** addOrderPack
   * @author Miguel Estevez
   * @summary Crea una nueva lista
   * @param name nombre de las lista
   * @param createdBy Id del creador de la lista
   * @param expirationDate Fecha de expiracion de la lista
   * @returns una nueva lista que fue creada o un error si lo hubo
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
  /** 
   * @author Miguel Estevez
   * @summary buscar una lista por su Id
   * @param orderPackId Id de la lista de ordenes
   * @returns La lista de ordenes correspondientes a ese Id o un error si no la encontro.
   */
  findOrderPack: async (req, res) => {
    try {
      const orderPack = await OrderPack.findById(req.params.OrderPackId).populate('createdBy','name');
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
  /**
   * @author Miguel Estevez
   * @param orderPackId Id de la lista de ordernes
   * @returns La lista que fue borrada con todas sus ordenes
   */
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
  /**
   * Esta es para las rutas
   * @author Miguel Estevez
   * @param orderPackId Id de la lista de ordernes
   * @returns La lista que fue borrada con todas sus ordenes
   */
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
   * Update a OrderPack
   * @author Miguel Estevez
   * @description Cambia los parametros de una lista especifica
   * @param orderPackId Id de la lista de ordenes que se debe modificar
   * @param body  un json donde especificara que atributos se cambiaran y con que valores.
   * @returns si es posible modificarla se retornara la lista ya modificada sino se notificara con un error
   */
  updateOrderPack: async (req, res) => {
    try {
      const orderPack = await OrderPack.findById(req.params.orderPackId);
      if(orderPack.createdBy == req.params.userId){
        if(orderPack.expirationDate < Date.now){
          var UpdatedOrder = await orderPack.updateOne({$set:req.body});
          res.json(UpdatedOrder);
        }
        else{
          res.status(400).json({message:"The date of expiration have already passed."})
        }
      }
      else{
        res.status(400).json({"message":"Only the owner of the list can modify it."});
      }

    } catch (err) {
      res.status(400).json({ "message": err });
    }
  }
};
