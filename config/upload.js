import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dcnlyyb4p",
  api_key: "566276425127389",
  api_secret: "qDsBX-y2jXSdTK8RxSQp1QBwNIk",
});

const uploadFile = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "raw",
    });
    return result;
  } catch (error) {
    console.log(error);
    // throw new Error(error);
  }
};

const uploadMultiFile = async (files) => {
  try {
    const urls = files;
    for (let i = 0; i < files.length; i++) {
      const result = await uploadFile(files[i].path);

      urls[i].path = result.url;
    }
    return urls;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export default uploadMultiFile;
