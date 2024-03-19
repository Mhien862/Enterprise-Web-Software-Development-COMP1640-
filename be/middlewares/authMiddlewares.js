import jwt from "jsonwebtoken";
import User from "../models/userModels.js";
const authenticate = async (req, res, next) => {
  let authHeader = req.headers.authorization || req.headers.Authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).send('Unauthorized')
  }
  let token = authHeader.split(' ')[1]
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};
const authenticateAdmin = async (req, res, next) => {
  // Kiểm tra xem người dùng đã đăng nhập và có vai trò là admin không
  if (req.user && req.user.role === "admin") {
    next(); // Nếu là admin, tiếp tục thực hiện yêu cầu tiếp theo
  } else {
    res.status(403).json({ message: "Only admin can perform this action" });
  }
};
export { authenticateAdmin, authenticate };
