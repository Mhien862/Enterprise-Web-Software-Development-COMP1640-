import User from "../models/userModels.js";
import { Role } from "../models/roleModel.js"; // Import Role model

const registerUser = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;

    // Xác định ID của vai trò từ tên vai trò được gửi từ client
    const roleData = await Role.findOne({ roleName: role });
    const roleId = roleData._id;

    // Tạo một đối tượng user mới từ dữ liệu được gửi từ client
    const newUser = new User({ username, password, email, role: roleId });

    // Lưu user mới vào cơ sở dữ liệu
    await newUser.save();

    // Trả về phản hồi thành công
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // Nếu có lỗi, trả về phản hồi lỗi và thông báo lỗi
    console.error("Error: ", error);
    res
      .status(500)
      .json({ message: "An error occurred while registering user" });
  }
};
const loginUser = async (req, res) => {};
export { registerUser, loginUser };
