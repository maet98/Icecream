const express = require("express");
const router = express.Router();
const {
  allUser,
  findUser,
  updateUser,
  deleteUser,
  addUser,
  getOrder
} = require("../controllers/userController");

router.get("/", allUser);

router.post("/addUser", addUser);

//Specific User
router.get("/:UserId", findUser);

//Delete Specific User
router.delete("/:userId", deleteUser);

//Update a User
router.patch("/:userId", updateUser);

//getallOrder of a user
router.get("/order/:userId", getOrder);

module.exports = router;
