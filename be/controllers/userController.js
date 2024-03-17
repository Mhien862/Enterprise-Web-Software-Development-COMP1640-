import User from "../models/userModels.js";
import { Role } from "../models/roleModel.js"; // Import Role model
import bcrypt from "bcryptjs";
import { Faculty } from "../models/facultyModel.js";
import createToken from "../utils/createToken.js";
const registerUser = async (req, res) => {
  try {
    const { username, password, email, roleName, facultyName } = req.body;

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
      faculty: facultyName, // Lưu tên của vai trò vào cơ sở dữ liệu
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

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (isPasswordValid) {
      const token = createToken(res, existingUser._id);
      res.status(200).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
        role: existingUser.role,
        faculty: existingUser.faculty,
        token: token,
      });
      return;
    }
  }
};
const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
};
export { registerUser, loginUser, logoutUser };
