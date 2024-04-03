import archiver from "archiver";
import fs from "fs";
import path from "path";
import File from "../models/fileModel.js";

const downloadAllFiles = async (req, res) => {
  try {
    // Create a new archiver instance
    const archive = archiver("zip", {
      zlib: { level: 5 }, // Sets the compression level
    });

    // This is where we will store our files
    const outputFilePath = path.join("be", "file", "all_files.zip");
    const output = fs.createWriteStream(outputFilePath);

    // Pipe archive data to the output file
    archive.pipe(output);

    // Get all files from the database
    const files = await File.find({});

    // Add each file to the archive
    files.forEach((file) => {
      const filePath = path.join("be", "uploads", file.filename);

      if (fs.existsSync(filePath)) {
        archive.append(fs.createReadStream(filePath), { name: file.filename });
      } else {
        console.log(`File not found: ${filePath}`);
      }
    });

    // Finalize the archive (ie we are done appending files but streams have to finish yet)
    archive.finalize();

    // Send the archive as a download to the client
    res.download(outputFilePath);
    res.status(200).json({ message: "Download all files successfully" });
  } catch (error) {
    console.error("Error downloading all files:", error);
    res.status(500).json({ message: "Failed to download all files" });
  }
};

export { downloadAllFiles };
