import Message from "../models/Message.js";

export const getMessagesOfThisChat = async (req, res) => {
  const messages = await Message.find({
    from: req.user.name,
    to: req.params.id,
  });
  res.send(messages);
};

export const sendMessage = async (req, res) => {
  // const { from, to, content } = req.body;
  console.log(req.body, req.user.name, req.params.id);
  // try {
  //   await Message.create({
  //     from,
  //     to,
  //     content,
  //     time: new Date().toLocaleTimeString(),
  //   });
  //   res.send("message sent successfully");
  // } catch (err) {
  //   res.send(err.message);
  // }
};
