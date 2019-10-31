const mongoose = require("mongoose");
const User = require("./User");

const OrderPackSchema = mongoose.Schema({
  createdBy:{
    type: mongoose.Schema.Types.ObjectId, 
    ref:'User',
    require: true
  },
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
