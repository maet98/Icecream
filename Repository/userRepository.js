const User = require("../models/User");
const Order = require("../models/Order");
const OrderPack = require("../models/OrderPack");
const {removeOrderPack} = require("../Repository/orderPackRepository");

module.exports = {
  /**
   * @author Miguel Estevez
   * @returns Un arreglo con todos los usuarios que estan en la base de datos
   */
  allUser: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  /**
   * @author Miguel Estevez
   * @description Ingresar un usuario a la base de datos
   * @param name nombre del usuario
   * @param email email del usuario
   * @param password contraseña del usuario
   * @returns El usuario creado.
   */ 
  addUser: async (req, res) => {
    try {
      const user = new User(req.body);
      const savedUser = await user.save();
      res.status(200).json(savedUser);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  /**
   * @author Miguel Estevez
   * @description Busca todas las ordenes de un usuario
   * @param userId id del usuario
   * @returns Un arreglo de ordenes
   */
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
  /**
   * @author Miguel Estevez
   * @description Busca un usuario por su id
   * @param UserId id del usuario a buscar.
   * @returns Un usuario 
   */
  getUser: async (userId) => {
    try{
      const user = await User.findById(userId);
      return user;
    }
    catch(err){
      return err;
    }
  },
  /**
   * @author Miguel Estevez
   * @description Busca un usuario por su id
   * @param userId Id del usuario a buscar
   * @returns Un usuario
   */
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
  /**
   * @author Miguel Estevez
   * @description Borra un Usuario de la base de datos
   * @param userId Id del usuario a borrar
   * @returns El usuario borrado junto con las lista de ordenes que lo referencian y las
   */
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
  /**
   * @author Miguel Estevez
   * @description Busca todas las lista de ordenes que fueron creada por un usuario.
   * @param userId id del usuario
   * @returns Un arreglo de lista de ordenes.
   */
  getOrderPacks: async (req, res) =>{
    try{
      const ordersPacks = await OrderPack.find({createdBy:req.params.userId});
      res.status(200).json(ordersPacks);
    }
    catch(err){
      res.status(400).json({message:err});
    }
  },
  /**
   * @author Miguel Estevez
   * @description modifica las informaciones de un usuario
   * @param userId Id del usuario a modificar
   * @returns El usuario ya modificado
   */
  updateUser: async (req, res) => {
    try {
      req.body.updateAt = new Date();
      const userRequest = await User.updateOne({ _id: req.params.userId },
        {
          $set: req.body
        });
      res.status(200).json(userRequest);
    } catch (err) {
      res.status(400).json({ message: "User not found in the DB" });
    }
  },
  /**
   * @author Miguel Estevez
   * @description Auntentifica un usuario 
   * @param email email de un ususario.
   * @param password contraseña de un usuario.
   * @returns verdadero si el email y la contraseña concuerdan con un usuario de la base de datos o false en el caso que no.
   */
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
