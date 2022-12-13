import Message from "../models/Message.js";

export const getMessagesOfThisChat = async (req, res) => {
  const messages = await Message.find({
    from: req.user.name,
    to: req.body.name,
  });
  res.send(messages);
};

export const sendMessage = async (req, res) => {
  const { from, to, content } = req.body;
  await Message.create({
    from,
    to,
    content,
    time: new Date().toLocaleTimeString(),
  });
};
