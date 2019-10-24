const User = require("../models/User");

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
  findUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.UserId);
      res.json(user);
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
    if (!req.params.userId) {
      res.status(400).json({ message: "You should get give an user id" });
      return;
    }
    try {
      console.log(req.body);
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
  }
};
