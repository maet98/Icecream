const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  description: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  PaymentMethod: {
    type: String,
    enum: ["Cash", "Credit"],
    default: "Cash"
  },
  payed: {
    type: Boolean,
    require: true
  }
});

module.exports = mongoose.model("OrderPack", OrderSchemabody);
