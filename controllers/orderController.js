const Order = require("../models/Order");
const User = require("../models/User");
const OrderPack = require("../models/OrderPack");

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
      const orderSaved = await order.save();
      res.status(200).json(orderSaved);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  findOrder: async (req, res) => {
    try {
      const order = await Order.findById(req.params.UserId);
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  //Delete Specific Order
  deleteOrder: async (req, res) => {
    try {
      const removedOrder = await Order.findByIdAndDelete(req.order.orderId);
      res.json(removedOrder);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },

  //Update an Order
  updateOrder: async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        { _id: req.params.orderId },
        {
          $set: {
            description: req.body.description,
            price: req.body.price,
            PaymentMethod: req.params.PaymentMethod,
            payed: req.params.payed
          }
        }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
};
