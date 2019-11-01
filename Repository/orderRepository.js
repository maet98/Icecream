const Order = require("../models/Order");
const OrderPack = require("../models/OrderPack");
const {getUser} = require("./userRepository");
const {getOrderPack} = require("./orderPackRepository");

module.exports = {
  /**
   * @author Miguel Estevez
   * @description elige todas las ordenes que estan la base de datos.
   * @returns arreglo de ordenes.
   */
  allOrder: async (req, res) => {
    try {
      const all = await Order.find().populate('orderBy','name').populate('orderPack','name');
      res.status(200).json(all);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  /**
   * @author Miguel Estevez
   * @description Ingresa una orden en la base de datos
   * @constraint Un usuario no puede ingresar dos ordenes en la misma lista
   * @param UserId Id del usuario que esta haciendo la orden
   * @param description Descripcion de la orden 
   * @param price precio de la orden a realizar
   * @param payed si fue pagada o no
   * @param MethodPayment credito o efectivo
   * @param orderPackId id de la lista de ordenes en donde se va a ingresar
   * @returns La orden creada si no hubo problema sino devolvera un mensaje con dicho problema.
   */
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
  /**
   * @author Miguel Estevez
   * @description Buscara una orden especifica en la base de datos
   * @param orderId id de la orden que se va buscar 
   */
  findOrder: async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderId);
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  /**
   * @author Miguel Estevez
   * @description Borra una orden de la base de datos
   * @param userId Id del usuario el cual va a borrar la orden
   * @param orderId Id de la orden que se desea borrar
   * @returns retornara la orden borrada si el usuario que lo quiere realizar es o el dueño de la lista o quien la realizo
   */
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
  /**
   * @author Miguel Estevez
   * @param OrderId id de la order a modificar
   * @param body json donde estaran os atributos que se cambiaran
   * @returns La order ya modificada o si hubo un problema un mensaje
   */
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
          if(Date.now < orderPack.expirationDate){
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
        else
        {
          res.status(400).json({message:"Can't modify the order from other user."});
        }
      })
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
};
