import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import catchAsync from "express-async-handler";

const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.json({
        error: " no token to authorized",
      });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decode.id).select("-password");
    console.log("userProtect   ", req.user);
    next();
  } else
    return res.status(401).json({
      message: " not authorized",
    });
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ error: "Not Authorized as an Admin" });
  }
};

export { protect, admin };
