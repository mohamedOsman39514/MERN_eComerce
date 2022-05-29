import catchAsync from "express-async-handler";

import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// Register
const Register = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(404).json({
      error: "email is exist",
    });
  }

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({
      error: "invalid user data",
    });
  }
});

// LogIn
const authUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({
      error: "invalid email or password",
      token: generateToken(user._id),
    });
  }
});

// User Profile
const getUserProfile = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);

  console.log("userGET   ", user);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404).json({
      error: "User Not Found",
    });
  }
});

// Update User Profile
const updateUserProfile = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updateUser = await user.save();

    console.log("userUPDATE   ", updateUser);

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    });
  } else {
    res.status(404).json({
      error: "User Not Found",
    });
  }
});

// Get All Users By Admin
const getUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.json(users);
});

// Get User By Admin
const getUserById = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "user not found" });
  }
});

// Update User Profile By Admin
const updateUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);

  console.log("userUPDATE   ", user);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || req.isAdmin;

    const updateUser = await user.save();

    console.log("userUPDATE   ", updateUser);

    res.json({
      id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
    });
  } else {
    res.status(404).json({
      error: "User Not Found",
    });
  }
});

// Delete User
const deleteUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "user has been removed" });
  } else {
    res.status(404).json({ error: "user not found" });
  }
});

export {
  authUser,
  getUserProfile,
  Register,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
};
