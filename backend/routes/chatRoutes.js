const express = require("express");
const router = express.Router();

const { createChat, allChats } = require("../controllers/ChatController");

router.get("/createChat/:firstId/:secondId", createChat);
router.get("/allChats", allChats);

module.exports = router;
