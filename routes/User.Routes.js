const express = require("express");
const router = express.Router();
const {
  randomUser,
  allUsers,
  saveUser,
  updateUser,
  deleteUser,
  bulkUpdate,
} = require("../controllers/UserController");
const { validSingleUser, validUser } = require("../models/userModel");

router.get("/random", randomUser);
router.get("/all", allUsers);
router.post("/save", validSingleUser, saveUser);
router.patch("/update/:id", validUser, updateUser);
router.patch("/bulk-update", bulkUpdate);
router.delete("/delete/:id", deleteUser);

module.exports = router;
