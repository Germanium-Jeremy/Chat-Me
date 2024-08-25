const express = require("express");
const router = express.Router();

const { allMessages , createMessage} = require("../controllers/MessageController");

router.get("/allMessages/:chatId", allMessages);
router.post("/createMessage", createMessage);

module.exports = router;
