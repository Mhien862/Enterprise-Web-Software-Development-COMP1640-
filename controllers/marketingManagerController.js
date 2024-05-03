import archiver from "archiver";
import fs from "fs";
import path from "path";
import File from "../models/fileModel.js";
import Contribution from "../models/contributionModel.js";
import User from "../models/userModels.js";
const downloadAllFiles = async (req, res) => {
  try {
    const archive = archiver("zip", {
      zlib: { level: 5 },
    });

    const outputFilePath = path.join("be", "file", "all_files.zip");
    const output = fs.createWriteStream(outputFilePath);

    archive.pipe(output);

    const files = await File.find({});

    files.forEach((file) => {
      const filePath = path.join("uploads", file.filename);

      if (fs.existsSync(filePath)) {
        archive.append(fs.createReadStream(filePath), { name: file.filename });
      } else {
        console.log(`File not found: ${filePath}`);
      }
    });

    archive.finalize();

    res.download(outputFilePath);
    res.status(200).json({ message: "Download all files successfully" });
  } catch (error) {
    console.error("Error downloading all files:", error);
    res.status(404).json({ message: "Failed to download all files" });
  }
};
const getContribution = async (req, res) => {
  try {
    const contributions = await Contribution.find().populate("files").exec();

    res.status(200).json(contributions);
  } catch (error) {
    console.error("Error retrieving contributions:", error);
    // throw new Error("Failed to retrieve contributions");
  }
};

const getContributionImg = async (req, res) => {
  let image = req.params.name;
  const __dirname = path.resolve();
  let filePath = path.join(__dirname, `uploads/${image}`);
  res.sendFile(filePath);
};

const getDashboardStatistics = async (req, res) => {
  try {
    // Số lượng đóng góp từ mỗi khoa
    const contributionsPerFaculty = await Contribution.aggregate([
      { $group: { _id: "$faculty", count: { $sum: 1 } } },
    ]);

    // Đếm số lượng sinh viên trong mỗi khoa từ collection người dùng
    const studentsCountPerFaculty = await User.aggregate([
      { $match: { role: "student" } },
      { $group: { _id: "$faculty", count: { $sum: 1 } } },
    ]);

    // Tổng số lượng sinh viên
    const totalStudents = studentsCountPerFaculty.reduce(
      (acc, cur) => acc + cur.count,
      0
    );

    // Tính tỉ lệ đóng góp từ mỗi khoa
    const totalContributions = contributionsPerFaculty.reduce(
      (acc, cur) => acc + cur.count,
      0
    );
    const percentagePerFaculty = contributionsPerFaculty.map((faculty) => ({
      faculty: faculty._id,
      percentage: ((faculty.count / totalContributions) * 100).toFixed(2),
    }));

    res.status(200).json({
      contributionsPerFaculty,

      studentsCountPerFaculty,
      totalStudents,
      percentagePerFaculty,
    });
  } catch (error) {
    console.error("Error getting dashboard statistics:", error);
    res.status(500).json({ message: "Failed to get dashboard statistics" });
  }
};
export {
  downloadAllFiles,
  getContribution,
  getDashboardStatistics,
  getContributionImg,
};
