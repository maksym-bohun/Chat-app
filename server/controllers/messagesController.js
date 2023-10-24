const Message = require("../models/messageModel");

exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) {
      return res.json({ status: "success", msg: "Message added successfully" });
    }
    return req.json({
      status: "fail",
      msg: "Failed to add message to the database",
    });
  } catch (err) {
    res.json({ status: "error", error: err });
  }
};
exports.getAllMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    return res.json({ status: "success", projectMessages });
  } catch (err) {
    res.json({ status: "error", error: err });
  }
};
