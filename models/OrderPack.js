const mongoose = require("mongoose");

const OrderPackSchema = mongoose.Schema({
  createBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  orders: [],
  expirationDate: {
    type: Date,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date
  }
});

module.exports = mongoose.model("OrderPack", OrderPackSchema);
