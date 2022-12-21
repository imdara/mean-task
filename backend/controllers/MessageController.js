import Message from "../models/Message.js";

export const getMessagesOfThisChat = async (req, res) => {
  const messagesSent = await Message.find({
    from: req.user.id,
    to: req.params.id,
  });
  const messagesRecieved = await Message.find({
    from: req.params.id,
    to: req.user.id,
  });
  res.send([...messagesRecieved, ...messagesSent]);
};

export const sendMessage = async (req, res) => {
  try {
    await Message.create({
      from: req.user.id,
      to: req.params.id,
      content: req.body.message,
      time: new Date().toLocaleTimeString(),
    });
    res.send("message sent successfully");
  } catch (err) {
    res.send(err.message);
  }
};
