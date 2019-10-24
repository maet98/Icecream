const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  description: {
    type: String,
    require: true
  },
  price: {
    type: double,
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
  },
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OrderPack"
  },
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("OrderPack", OrderPackSchema);
