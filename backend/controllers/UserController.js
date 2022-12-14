import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const getCurrentUserDetails = (req, res) =>
  res.status(200).send(req.user);

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  const userList = users.map((user) => {
    return { id: user._id, name: user.name, email: user.email };
  });
  res.send(userList);
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const emailExists = await User.findOne({ email });
  if (!emailExists) {
    res.send({ message: `${email} is not registered` });
  } else {
    const passwordCheck = await bcrypt.compare(password, emailExists.password);
    const user = {
      id: emailExists._id,
      name: emailExists.name,
      email: emailExists.email,
      isAdmin: emailExists.isAdmin,
    };
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
    res.status(200).send({ message: "User signed up successfully" });
  } else res.status(400).send({ message: `${email} is already registered` });
};

// admin only

export const getAllDetails = async (req, res) => {
  const allUsers = await User.find();
  req.user.isAdmin
    ? res.send(allUsers)
    : res.status(404).send({ message: "Not authorized" });
};

export const userEdit = async (req, res) => {
  const { firstName, lastName } = req.body;
  if (req.user.isAdmin) {
    await User.findOneAndUpdate(
      { _id: req.params.id },
      { name: `${firstName} ${lastName}` }
    );
    res.send({ message: "User updated successfully" });
  } else res.send({ message: "Not authorized" });
};

export const userDelete = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      await User.findOneAndDelete({ _id: req.params.id });
      res.send({ message: "User deleted succesfully" });
    } else res.send({ message: "Not authorized" });
  } catch (err) {
    res.send(err);
  }
};
