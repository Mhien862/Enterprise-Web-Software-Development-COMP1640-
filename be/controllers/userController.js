import User from "../models/userModels.js";
import { Role } from "../models/roleModel.js"; // Import Role model
import bcrypt from "bcryptjs";
const registerUser = async (req, res) => {
  try {
    const { username, password, email, roleName } = req.body;

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tìm vai trò dựa trên tên vai trò
    const role = await Role.findOne({ roleName });

    // Kiểm tra xem vai trò có tồn tại không
    if (!role) {
      return res.status(400).json({ message: "Role not found" });
    }

    // Tạo một đối tượng user mới từ dữ liệu được gửi từ client
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      role: roleName, // Lưu tên của vai trò vào cơ sở dữ liệu
    });

    // Lưu user mới vào cơ sở dữ liệu
    await newUser.save();

    // Trả về phản hồi thành công
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // Nếu có lỗi, trả về phản hồi lỗi và thông báo lỗi
    console.error("Error: ", error);
    res.status(500).json({ message: "Username or email already exists" });
  }
};

const loginUser = async (req, res) => {};
export { registerUser, loginUser };
