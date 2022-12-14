import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const getCurrentUserDetails = (req, res) =>
  res.status(200).send(req.user);

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  const usernameList = users.map((user) => user.name);
  res.send(usernameList);
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const emailExists = await User.findOne({ email });
  if (!emailExists) {
    res.send({ message: `${email} is not registered` });
  } else {
    const passwordCheck = await bcrypt.compare(password, emailExists.password);
    const user = { name: emailExists.name, email: emailExists.email };
    if (passwordCheck) {
      const token = jwt.sign(
        user,
        process.env.ACCESS_TOKEN_SECRET || "secretkey",
        {
          expiresIn: "5d",
        }
      );
      res.send({
        message: "User logged in successfully",
        token,
      });
    } else res.send({ message: "Password is incorrect" });
  }
};

export const userSignup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const emailExists = await User.findOne({ email });
  if (!emailExists) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    });
    res.status(200).send("User signed up successfully");
  } else res.status(400).send(`${email} is already registered`);
};

export const userEdit = async (req, res) => {
  const { email } = req.user;
  const { firstName, lastName } = req.body;
  await User.findOneAndUpdate({ email }, { name: `${firstName} ${lastName}` });
  res.send("User updated successfully");
};

export const userDelete = async (req, res) => {
  const { email } = req.user;
  await User.findOneAndDelete({ email });
};

// admin only

export const getAllDetails = async (req, res) => {
  const allUsers = await User.find();
  req.user.isAdmin
    ? res.send(allUsers)
    : res.status(404).send("Not authorized");
};
