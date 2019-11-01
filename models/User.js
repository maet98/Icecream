const mongoose = require("mongoose");
/**
 * @author Miguel Estevez
 * @description Representacion de un usuario
 * @param name nombre del usuario
 * @param email email del usuario
 * @param password contraseña de la cuenta
 * @param createAt fecha de creacion
 * @param updateAt Ultima fecha de modificacion
 */
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
    default: new Date()
  },
  updateAt: Date,
});

module.exports = mongoose.model("User", UserSchema);
