import nodemailer from "nodemailer";
import Contribution from "../models/contributionModel.js";

const sendEmailNotification = async (newContributions) => {
  try {
    // Nếu có bài gửi mới, gửi email thông báo
    if (newContributions.length > 0) {
      // Thiết lập transporter cho dịch vụ email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "pvhh1072002@gmail.com",
          pass: "sqft kutv qowx rvpk",
        },
      });

      // Tạo nội dung email
      const mailOptions = {
        from: "pvhh1072002@gmail.com",
        to: "pvh1072002@gmail.com",
        subject: "New contributions from students",
        text: `There are ${newContributions.length} new contribution from students.`,
      };

      // Gửi email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    }
  } catch (error) {
    console.error("Error sending email notification:", error);
  }
};
const getContributionsPerFaculty = async (req, res) => {
  try {
    // Lấy thông tin về người dùng từ request (ví dụ: khoa của marketing coordinator)
    const { faculty } = req.user;

    // Tìm các đóng góp của sinh viên trong khoa của marketing coordinator
    const contributions = await Contribution.find({ faculty }).populate(
      "user",
      "name email"
    );

    res.status(200).json({ contributions });
  } catch (error) {
    console.error("Error fetching contributions:", error);
    res.status(500).json({ message: "Failed to fetch contributions" });
  }
};
export { sendEmailNotification, getContributionsPerFaculty };
