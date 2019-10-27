const Order = require("../models/Order");
const User = require("../models/User");
const OrderPack = require("../models/OrderPack");

module.exports = {
  allOrderPacks: async (req, res) => {
    try {
      const all = await OrderPack.find();
      res.status(200).json(all);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  addOrderPack: async (req, res) => {
    try {
      const order = new Order({
        description: req.body.description,
        price = req.body.price,
        PaymentMethod: req.body.PaymentMethod,
        payed: req.body.payed
      });
      user = async () => {
        try {
          const ans = await User.findById(req.body.userId);
          return ans;
        } catch (err) {
          return null;
        }
      };
      if (!user) {
        res.status(400).json({ message: "User not found by that Id." });
        return;
      } else {
        user.orders.push(order);
      }
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  findOrder: async (req, res) => {
    try {
      const order = await order.findById(req.params.UserId);
      res.json(user);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  //Delete Specific Order
  deleteUser: async (req, res) => {
    try {
      const removedOrder = await Order.findByIdAndDelete(req.order.orderId);
      res.json(removedOrder);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },

  //Update a User
  updateOrder: async (req, res) => {
    if (!req.params.orderId) {
      res.status(400).json({ message: "You should get give an order id" });
      return;
    }
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        { _id: req.params.orderId },
        {
          $set: {
            // name: req.body.name,
            // email: req.body.email,
            // password: req.body.password
          }
        }
      );
      res.json(updatedOrder);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
};
