const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {
  allOrder,
  findOrder,
  updateOrder,
  deleteOrder,
  updateOrder
} = require("../controllers/orderController");

router.get("/", allOrder);

router.post("/addUser", addUser);

//Specific User
router.get("/:UserId", findUser);

//Delete Specific User
router.delete("/:userId", deleteUser);

//Update a User
router.patch("/:userId", updateUser);

//getallOrder
router.get("/order/:userId", getOrder);

module.exports = router;
