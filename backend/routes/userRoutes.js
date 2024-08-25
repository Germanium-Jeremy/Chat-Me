const express = require("express");
const router = express.Router();

const { register, login, allUsers, googleAuth } = require("../controllers/UserController");

router.post("/register", register);
router.post("/signin", login);
router.post("/googleAuth", googleAuth);
router.get("/allUsers/:userId", allUsers);

module.exports = router;
