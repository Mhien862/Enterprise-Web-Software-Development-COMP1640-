import jwt from "jsonwebtoken";
import User from "../models/userModels.js";

const authenticate = async (req, res, next) => {
  const token = req.headers["authorization"];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

const authenticateAdmin = async (req, res, next) => {
  try {
    const userId = req.headers["user-id"];
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Only admin can perform this action" });
    }
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    res.status(404).json({ message: "user-id not found" });
  }
};

export { authenticate, authenticateAdmin };
