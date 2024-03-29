import User from "../models/userModels.js";

import bcrypt from "bcryptjs";

import createToken from "../utils/createToken.js";

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

const handleUpload = async (req, res) => {
  try {
    // Kiểm tra xem biến isSelected có được truyền là true không
    const isSelected = req.body.isSelected === "true";
    if (isSelected !== true) {
      return res
        .status(400)
        .json({ message: "Files can only be uploaded if isSelected is true" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadedFilesInfo = await Promise.all(
      req.files.map(async (file) => {
        const { originalname, mimetype, filename, path } = file;
        const userId = req.user._id;
        const submissionDate = req.body.submissionDate
          ? new Date(req.body.submissionDate).toISOString()
          : new Date().toISOString();
        const { faculty, status } = req.body;

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
          isSelected: true, // Đảm bảo isSelected luôn là true
        });
        await newContribution.save();

        // Trả về thông tin về file
        return {
          user: userId,
          faculty,
          originalname,
          mimetype,
          filename,
          path,
          submissionDate,
        };
      })
    );

    res.status(200).json({
      message: "File uploaded successfully",
      fileInfo: uploadedFilesInfo,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Failed to upload file" });
  }
};

const deleteContribution = async (req, res) => {
  try {
    const contributionId = req.query.contributionId;

    // Kiểm tra xem đóng góp có tồn tại không
    const existingContribution = await Contribution.findById(contributionId);
    if (!existingContribution) {
      return res.status(404).json({ message: "Contribution not found" });
    }

    // Xóa đóng góp từ cơ sở dữ liệu
    await Contribution.findByIdAndDelete(contributionId);

    res.json({ message: "Contribution deleted successfully" });
  } catch (error) {
    console.error("Error deleting contribution:", error);
    res.status(500).json({ message: "Failed to delete contribution" });
  }
};

export { loginUser, logoutUser, getProfile, handleUpload, deleteContribution };
