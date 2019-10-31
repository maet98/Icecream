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

router.get("/", allOrderPacks);

router.post("/", addOrderPack);

//Get all Orders from a OrderPack
router.get("/orders/:OrderPackId",getOrders);

//Specific OrderPack
router.get("/:OrderPackId", findOrderPack);

//Delete Specific OrderPack
router.delete("/:orderPackId", deleteOrderPack);

//Update a OrderPack
router.patch("/:orderPackId/:userId", updateOrderPack);

//getallOrder of a user
router.get("/order/:orderPackId", getOrders);

module.exports = router;
