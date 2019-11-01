const express = require("express");
const router = express.Router();
const {
  allUser,
  findUser,
  updateUser,
  deleteUser,
  addUser,
  aunthentication,
  findUserEmail,
  getOrder
} = require("../Repository/userRepository");

//Todos los usuarios registrados
router.get("/", allUser);

//Agregar un usuario nuevo
router.post("/", addUser);

//Auntenficacion de un usuario
router.post("/authentication",aunthentication);

//Buscar un usuario especifico en la base de datos
router.get("/:UserId", findUser);

//Borrar un usuario especifico
router.delete("/:userId", deleteUser);

//Modificar una usuario
router.patch("/:userId", updateUser);

//Devuelve todas las ordenes de un usuario
router.get("/order/:userId", getOrder);

module.exports = router;
