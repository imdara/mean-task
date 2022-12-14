import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { config } from "dotenv";
config();

// importing routes
import usersRoute from "./routes/users.js";
import messagesRoute from "./routes/messages.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:4200",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined room: ${data}`);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
// });

app.get("/", (req, res) => res.send({ status: 200, message: "OK" }));

// implementing routes
app.use("/api", usersRoute);
app.use("/api/messages", messagesRoute);

mongoose
  .set("strictQuery", false)
  .connect(process.env.DATABASE_URL || "mongodb://localhost/myDb", {
    useNewUrlParser: true,
  })
  .then(
    app.listen(PORT, () => {
      console.log("listening on port", PORT);
      console.log("Connected to the database");
    })
  )
  .catch((err) => console.log(err));
