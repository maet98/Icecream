const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  updateAt: Date,
  orders: [],
  orderPacks: []
});

module.exports = mongoose.model("User", UserSchema);
