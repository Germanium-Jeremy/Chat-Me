const express = require("express");
const router = express.Router();

const { simpleGet, simplePost, others } = require("../controllers/simpleControllers");

router.get("/", simpleGet);
router.post("/", simplePost);
router.get("*", others);
router.post("*", others);
router.put("*", others);
router.delete("*", others);

module.exports = router;
