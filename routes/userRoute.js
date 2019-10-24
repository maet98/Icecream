const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {
  allUser,
  findUser,
  updateUser,
  deleteUser,
  addUser
} = require("../controllers/userController");

router.get("/", allUser);

router.post("/addUser", addUser);

//Specific User
router.get("/:UserId", findUser);

//Delete Specific User
router.delete("/:userId", deleteUser);

//Update a User
router.patch("/:userId", updateUser);

module.exports = router;
