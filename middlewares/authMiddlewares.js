import jwt from "jsonwebtoken";
import User from "../models/userModels.js";
import { log } from "console";
const authenticate = async (req, res, next) => {
  const token = req.headers["authorization"];

  try {
    // auto verify
    jwt.verify(token, process.env.JWT_SECRET);
    // req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    // not crash app
    res.send(401);
    next(error);
  }
};

const authenticateAdmin = async (req, res, next) => {
  try {
    // Trích xuất id của người dùng từ header
    // Truy vấn MongoDB để lấy thông tin của người dùng dựa trên id
    const userId = req.headers["user-id"];
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    // Kiểm tra xem người dùng có tồn tại và có vai trò là admin không
    if (user.role === "admin") {
      next();
    } else {
      // Nếu người dùng không phải là admin, trả về mã lỗi 403
      res.status(403).json({ message: "Only admin can perform this action" });
    }
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error in authentication middleware:", error);
    res.status(404).json({ message: "user-id not found" });
  }
};

export { authenticate, authenticateAdmin };
