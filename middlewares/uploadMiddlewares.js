import multer from "multer";
import path from "path";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "be/uploads"); // Thư mục lưu trữ file, bạn có thể thay đổi đường dẫn tùy ý
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     cb(null, Date.now() + "-" + file.fieldname + ext); // Tên file: timestamp-fieldname-originalname
//   },
// });

const storage = multer.diskStorage({
  // destination: './image',
  filename: (_, file, cb) => {
    const name = file.originalname.split(".")[0];
    const fileExtension = file.originalname.split(".")[1];
    const newFileName =
      name.split(" ").join("_") + Date.now() + "." + fileExtension;
    cb(null, newFileName);
  },
});

// const fileFilter = (_, file, cb) => {
//   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//     return cb(null, false);
//   }
//   cb(null, true);
// };

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]; // Danh sách các loại file cho phép
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
});

// API upload file
const uploadMiddleware = upload.array("files", 5);
export { uploadMiddleware };
