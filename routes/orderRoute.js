const express = require("express");
const router = express.Router();
const {
  allOrder,
  deleteOrder,
  findOrder,
  updateOrder,
  addOrder
} = require("../Repository/orderRepository");

//Todas las ordenes registradas
router.get("/", allOrder);

//Agregar una orden
router.post("/", addOrder);

//Buscar una orden especifica
router.get("/:orderId", findOrder);

//Borrar una orden
router.delete("/:orderId/:userId", deleteOrder);

//Modificar una orden
router.patch("/:orderId", updateOrder);


module.exports = router;
