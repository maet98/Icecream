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

router.get("/", allUser);

router.post("/", addUser);

//Login
router.post("/authentication",aunthentication);

//Specific User
router.get("/:UserId", findUser);

//Delete Specific User
router.delete("/:userId", deleteUser);

//Update a User
router.patch("/:userId", updateUser);

//getallOrder of a user
router.get("/order/:userId", getOrder);

module.exports = router;
