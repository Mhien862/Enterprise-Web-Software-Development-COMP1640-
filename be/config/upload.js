import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
    cloud_name: 'dcnlyyb4p',
    api_key: '566276425127389',
    api_secret: 'qDsBX-y2jXSdTK8RxSQp1QBwNIk'
});

const uploadImage = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file, { resource_type: 'auto' })
        return result
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

const uploadDocx = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file, { format: "docx", resource_type: 'auto' })
        return result
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

const uploadMultiFile = async (files) => {
    try {
        const urls = files
        console.log(files)
        let result = {}
        for (let i = 0; i < files.length; i++) {
            //diskStorage
            if (files[i].mimetype === `application/vnd.openxmlformats-officedocument.wordprocessingml.document`) {
                result = await uploadDocx(files[i].path)
            } else {
                result = await uploadImage(files[i].path)
            }
            // memoryStorage
            // const b64 = Buffer.from(files[i].buffer).toString("base64");
            // let dataURI = "data:" + files[i].mimetype + ";base64," + b64;
            // const result = await uploadFile(dataURI)
            urls[i].path = result.url
        }
        console.log(urls)
        return urls
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

export default uploadMultiFile