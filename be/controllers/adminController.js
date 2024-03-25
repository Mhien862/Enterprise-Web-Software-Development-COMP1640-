import User from "../models/userModels.js";
import { Role } from "../models/roleModel.js";
import bcrypt from "bcryptjs";
import { Faculty } from "../models/facultyModel.js";
import Event from "../models/eventModel.js";
import AcademicYear from "../models/academicYearModel.js";
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
  const user = await User.findById(req.params.userId);
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
      role: updatedUser.role,
      faculty: updatedUser.faculty,
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
const createEvent = async (req, res) => {
  try {
    const { eventName, firstClosureDate, finalClosureDate, faculty } = req.body;

    if (!eventName || !firstClosureDate || !finalClosureDate || !faculty) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Tạo sự kiện mới
    const newEvent = new Event({
      eventName,
      firstClosureDate,
      finalClosureDate,
      faculty,
    });

    await newEvent.save();

    return res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({ message: "Event name already exists" });
  }
};
const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const { eventName, firstClosureDate, finalClosureDate, faculty } = req.body;

    // Tìm sự kiện trong cơ sở dữ liệu dựa trên eventId
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Cập nhật thông tin của sự kiện
    if (eventName) {
      event.eventName = eventName;
    }
    if (firstClosureDate) {
      event.firstClosureDate = firstClosureDate;
    }
    if (finalClosureDate) {
      event.finalClosureDate = finalClosureDate;
    }
    if (faculty) {
      event.faculty = faculty;
    }

    // Lưu lại sự kiện đã được cập nhật vào cơ sở dữ liệu
    const updatedEvent = await event.save();

    // Trả về phản hồi thành công
    res
      .status(200)
      .json({ message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to update event" });
  }
};
const createAcademicYear = async (req, res) => {
  try {
    const { year, firstClosureDate, finalClosureDate } = req.body;
    const existingYear = await AcademicYear.findOne({ year });

    if (existingYear) {
      return res.status(400).json({ message: "Academic year already exists" });
    }

    const academicYear = new AcademicYear({
      year,
      firstClosureDate,
      finalClosureDate,
    });

    await academicYear.save();
    res.status(201).json({
      message: "Academic year created successfully",
      academicYear: academicYear,
    });
  } catch (error) {
    console.error("Error creating academic year:", error);
    res.status(500).json({ message: "Failed to create academic year" });
  }
};
const updateAcademicYear = async (req, res) => {
  try {
    const { firstClosureDate, finalClosureDate } = req.body;

    const academicYear = await AcademicYear.findById(req.params.academicYearId);

    if (!academicYear) {
      return res.status(404).json({ message: "Academic year not found" });
    }

    academicYear.firstClosureDate = firstClosureDate;
    academicYear.finalClosureDate = finalClosureDate;

    await academicYear.save();
    res.json({
      message: "Academic year updated successfully",
      academicYear: academicYear,
    });
  } catch (error) {
    console.error("Error updating academic year:", error);
    res.status(500).json({ message: "Failed to update academic year" });
  }
};
const deleteAcademicYear = async (req, res) => {
  try {
    // Kiểm tra xem năm học có tồn tại không
    const academicYear = await AcademicYear.findById(req.params.academicYearId);
    if (!academicYear) {
      return res.status(404).json({ message: "Academic year not found" });
    }

    // Nếu năm học tồn tại, xóa nó từ cơ sở dữ liệu
    await AcademicYear.findByIdAndDelete(academicYear);

    res.status(200).json({ message: "Academic year deleted successfully" });
  } catch (error) {
    console.error("Error deleting academic year:", error);
    res.status(500).json({ message: "Failed to delete academic year" });
  }
};
export {
  registerUser,
  getAllUser,
  updateUser,
  deleteUser,
  createEvent,
  updateEvent,
  createAcademicYear,
  updateAcademicYear,
  deleteAcademicYear,
};
