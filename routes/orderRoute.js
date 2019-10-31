const express = require("express");
const router = express.Router();
const {
  allOrder,
  deleteOrder,
  findOrder,
  updateOrder,
  addOrder
} = require("../Repository/orderRepository");

//All the order in the DB
router.get("/", allOrder);

//Add a new Order
router.post("/", addOrder);

//Specific Order
router.get("/:orderId", findOrder);

//Delete Specific User
router.delete("/:orderId/:userId", deleteOrder);

//Update a Order
router.patch("/:orderId", updateOrder);


module.exports = router;
