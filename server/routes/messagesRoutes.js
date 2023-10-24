const express = require("express");

const { getAllMessages } = require("../controllers/messagesController");
const { addMessage } = require("../controllers/messagesController");

const router = express.Router();

router.post("/addMessage", addMessage);
router.post("/getAllMessages", getAllMessages);

module.exports = router;
