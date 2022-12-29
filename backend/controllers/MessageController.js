import Message from "../models/Message.js";

export const getMessagesOfThisChat = async (req, res) => {
  const messagesSent = await Message.find({
    flow: `${req.user.id}TO${req.params.id}`,
  });
  const messagesReceived = await Message.find({
    flow: `${req.params.id}TO${req.user.id}`,
  });
  res.send(
    [...messagesSent, ...messagesReceived].sort(
      (a, b) => a.createdAt - b.createdAt
    )
  );
};

export const sendMessage = async (req, res) => {
  try {
    await Message.create({
      from: req.user.id,
      to: req.params.id,
      content: req.body.message,
      flow: `${req.user.id}TO${req.params.id}`,
    });
    res.send({ message: "Message sent successfully" });
  } catch (err) {
    res.send(err);
  }
};
