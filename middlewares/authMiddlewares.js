import jwt from "jsonwebtoken";
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
  console.log(req.headers["session_id"]);

  // 1 hien truyen header len

  // 2 back end lay header check vs mongodb de get ra role cua user
  // 3 check !user thi show loi 404 user is not ...
  
  //4 Kiểm tra xem người dùng đã đăng nhập và có vai trò là admin không
  if (req.user.role === "admin") {
    next(); // Nếu là admin, tiếp tục thực hiện yêu cầu tiếp theo
  } else {
    res.status(404).json({ message: "Only admin can perform this action" });
  }
};
export { authenticate, authenticateAdmin };
