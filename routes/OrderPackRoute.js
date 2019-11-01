const express = require("express");
const router = express.Router();
const {
    addOrderPack,
    allOrderPacks,
    deleteOrderPack,
    findOrderPack,
    getOrders,
    updateOrderPack
} = require("../Repository/orderPackRepository");

// Ruta para devolver todos las lista de ordenes
router.get("/", allOrderPacks);

//Rubta para crear una lista de ordenes.
router.post("/", addOrderPack);

//Ruta para devolver todas las orders de una lista especifica
router.get("/orders/:OrderPackId",getOrders);

//Ruta para obtener una lista por su id
router.get("/:OrderPackId", findOrderPack);

//Ruta para borrar una lista
router.delete("/:orderPackId", deleteOrderPack);

//Ruta para modificar una lista
router.patch("/:orderPackId/:userId", updateOrderPack);

//Ruta para coger todas las ordenes de una lista
router.get("/order/:orderPackId", getOrders);


module.exports = router;
