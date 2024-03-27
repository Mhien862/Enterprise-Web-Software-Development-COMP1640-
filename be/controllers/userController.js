import User from "../models/userModels.js";

import bcrypt from "bcryptjs";

import createToken from "../utils/createToken.js";
import multer from "multer";
import path from "path";
import Contribution from "../models/contributionModel.js";

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
      // res.cookie("jwt", token, {
      //   httpOnly: true,
      //   sameSite: "Lax",
      //   secure: true,
      //   maxAge: 24 * 60 * 60 * 1000,
      // });
      res.status(200).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
        role: existingUser.role,
        faculty: existingUser.faculty,
        accessToken: token,
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
const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      username: user.username,
      email: user.email,
      role: user.role,
      faculty: user.faculty,
      agreement: user.agreement,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "be/uploads"); // Thư mục lưu trữ file, bạn có thể thay đổi đường dẫn tùy ý
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + file.fieldname + ext); // Tên file: timestamp-fieldname-originalname
  },
});

// Kiểm tra và lọc loại file cho phép
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"]; // Danh sách các loại file cho phép
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Chấp nhận file
  } else {
    cb(new Error("Only JPEG, PNG, and GIF files are allowed!"));
  }
};

// Khởi tạo middleware multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10, // Giới hạn dung lượng file (ở đây là 10MB)
  },
});

// API upload file
const uploadFile = upload.single("file"); // 'file' là tên của trường chứa file trong form data

const handleUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { originalname, mimetype, filename, path } = req.file;
    const userId = req.user._id;
    const submissionDate = req.body.submissionDate
      ? new Date(req.body.submissionDate).toISOString()
      : new Date().toISOString();
    const {
      faculty,

      status,
      isSelected,
    } = req.body;

    // Lưu thông tin file vào cơ sở dữ liệu
    const newContribution = new Contribution({
      user: userId,
      faculty,
      originalname,
      mimetype,
      filename,
      path,
      submissionDate,
      status,
      isSelected,
    });
    await newContribution.save();

    res.status(200).json({
      message: "File uploaded successfully",
      fileInfo: {
        user: userId,
        faculty,
        originalname,
        mimetype,
        filename,
        path,
      },
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Failed to upload file" });
  }
};
export { loginUser, logoutUser, getProfile, uploadFile, handleUpload };
