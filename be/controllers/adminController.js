import User from "../models/userModels.js";
import { Role } from "../models/roleModel.js"; // Import Role model
import bcrypt from "bcryptjs";
import { Faculty } from "../models/facultyModel.js";
import createToken from "../utils/createToken.js";
const registerUser = async (req, res) => {
  try {
    const { username, password, email, roleName, facultyName, agreement } =
      req.body;

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tìm vai trò dựa trên tên vai trò
    const role = await Role.findOne({ roleName });
    const faculty = await Faculty.findOne({ facultyName });
    // Kiểm tra xem vai trò có tồn tại không
    if (!role) {
      return res.status(400).json({ message: "Role not found" });
    }
    if (!faculty) {
      return res.status(400).json({ message: "Faculty not found" });
    }

    // Tạo một đối tượng user mới từ dữ liệu được gửi từ client
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      role: roleName,
      faculty: facultyName,
      agreement, // Lưu tên của vai trò vào cơ sở dữ liệu
    });

    // Lưu user mới vào cơ sở dữ liệu
    await newUser.save();
    // Tạo và gửi token cho user sau khi đăng ký thành công
    // createToken(res, newUser._id);
    // Trả về phản hồi thành công
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // Nếu có lỗi, trả về phản hồi lỗi và thông báo lỗi
    console.error("Error: ", error);
    res.status(500).json({ message: "Username or email already exists" });
  }
};
const getAllUser = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};
const updateUser = async (req, res) => {
  const user = await User.findById(req.query.userId);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    user.faculty = req.body.faculty || user.faculty;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};
const deleteUser = async (req, res) => {
  const user = await User.findById(req.query.userId);
  if (user) {
    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};
export { registerUser, getAllUser, updateUser, deleteUser };
