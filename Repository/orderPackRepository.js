const Order = require("../models/Order");
const User = require("../models/User");
const OrderPack = require("../models/OrderPack");
const sendEmail = require("../email");

module.exports = {
  /**
   * @author Miguel Estevez
   * @description Busca todas las listas de ordenes registradas.
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
  /** 
   * @author Miguel Estevez
   * @summary Crea una nueva lista
   * @param name nombre de las lista
   * @param createdBy Id del creador de la lista
   * @param expirationDate Fecha de expiracion de la lista
   * @param inCharge Persona que esta acargo de hace el pedido
   * @returns una nueva lista que fue creada o un error si lo hubo
   */
  addOrderPack: async (req, res) => {
    try {
      const orderPack = new OrderPack({
        name: req.body.name,
        createdBy: req.body.createdBy,
        expirationDate: req.body.expirationDate,
        inCharge: req.body.inCharge
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
      const orders = await Order.find({orderPack:req.params.OrderPackId}).populate('orderBy','name');
      if(!orderPack){
        res.status(400).json({messge:"OrderPack not found"});
        return;
      }
      res.json({"orderPack":orderPack,"orders":orders});
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  /**
   * @author Miguel Estevez
   * @description Obtiene todas las ordenes pertenecientes a una lista de ordenes
   * @param orderPackId Id de la lista de ordenes
   * @returns Un arreglo con todas las ordenes de una cierta lista.
   */
  getOrders: async(req,res) =>{
    try{
      const orders = await Order.find({orderPackId: req.params.OrderPackId}).populate('orderBy','name');
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
  },
  /**
   * @author Miguel Estevez
   * @description Busca todas las lista de ordenes y cheque si alguna ya a acabado para mandarle el email a la persona que le toque
   */
  checkEmail: async()=>{
    try{
      const orderPacks = await OrderPack.find({sended: false}).populate('inCharge');
      var list = [];
      var date = new Date();
      orderPacks.forEach(async(orderPack) =>{
        var orderDate = new Date(orderPack.expirationDate);
        if(orderDate <= date){
          try{
            console.log(orderPack);
            var listOrder = "";
            const orders = await Order.find({orderPack : orderPack._id}).populate('orderBy','name');
            var i = 1;
            if(orders.length > 0){
              orders.forEach((element)=>{
                listOrder = listOrder.concat(`${i}. ${element.description}\t\t ${element.orderBy.name}\n`);
                i++;
              });
            }
            var body = `Hello ${orderPack.inCharge.name}, \n You are the one in charge of taking the following order Pack.\n 
            You must call the ice cream shop "Helados Bon" at 809-951-5487\n`;
            body = body.concat(listOrder);
            var subject = `In charge of the ${orderPack.name}`;
            sendEmail(orderPack.inCharge.email,body,subject);
            orderPack.sended = true;
            const savedOrderPack = await orderPack.save();
            list.push(savedOrderPack);
          }
          catch(err){
            console.log(err);
          }
        }
      });
      return list;
    }
    catch(err){
      return null;
    }
  }
};
