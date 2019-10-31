const mongoose = require("mongoose");

/**
 * @description Es una representacion de una orden.
 * @author Miguel Estevez
 * @argument description: Descripcion de la orden
 * @argument price: Precio que cuesta
 * @PaymentMethod Tipo de pago(efectivo o tarjeta)
 * @orderBy Quien la ordeno
 * @orderPack A que lista pertence
 */
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
  },
  orderBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    require: true
  },
  orderPack:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'OrderPack',
    require:true
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date
  }
});

module.exports = mongoose.model("order", OrderSchema);
