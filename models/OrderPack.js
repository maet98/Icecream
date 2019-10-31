const mongoose = require("mongoose");
const User = require("./User");

/**Representa una lista de ordenes
 * @author Miguel Estevez
 * @argument createdBy Persona quien creo la lista
 * @argument expirationDate Fecha en que se termina la orden
 * @argument name Nombre de la order
 * @argument createAt fecha que fue creada
 * @argument updateAt fecha de la ultima actualizacion
 */
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
  },
  inCharge:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
});

module.exports = mongoose.model("OrderPack", OrderPackSchema);
