const express = require("express");
const { FormSendMessage } = require("./send");

const router = express.Router();

router.post("/send", FormSendMessage);

module.exports = router;
