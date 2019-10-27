const User = require("../models/User");
const Order = require("../models/Order");

module.exports = {
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
      res.status(200).json(user);
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
  //Find by email
  findUserEmail: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.status(400).json({ message: "There is not user with that name" });
      } else {
        res.status(200).json(user);
      }
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  //Delete Specific User
  deleteUser: async (req, res) => {
    try {
      const removeUser = await User.deleteOne({ _id: req.params.userId });
      res.json(removeUser);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },

  //Update a User
  updateUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        res.status(400).json({ message: "User not found." });
        return;
      }
      try {
        const updateUser = await User.updateOne(
          { _id: req.params.userId },
          {
            $set: {
              name: req.body.name,
              email: req.body.email,
              password: req.body.password
            }
          }
        );
        console.log(req.body);
        res.json(updateUser);
      } catch (err) {
        res.status(400).json({ message: err });
      }
    } catch (err) {
      res.status(400).json({ message: "User not found in the DB" });
    }
  }
};
