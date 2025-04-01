import multer from "multer"
import * as UploadCloudinary from "../utils/cloudinary.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import User from "../models/User.js";
import { isValidObjectId } from "mongoose";

const __user__ = "67dde04195ad4a28af06a045" // Should probably come from request (req.user._id)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../../Photo/'));
    },
    filename: function(req, file, cb) {
        const result = new Date().toISOString().replace(/:/g,"_")
        cb(null, result + file.originalname);
    }
});

export const upload = multer({ storage });

export const uploadPhoto = async (req, res) => {
    try {
        if(!isValidObjectId(__user__)) {
            return res.status(400).json({message:"Invalid user ID"});
        }

        const user = await User.findById(__user__);
        if(!user) {
            return res.status(404).json({message:"User not found"});
        }

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        //get image from folder
        const findImage = path.join(__dirname,`../../Photo/${req.file.filename}`)
        //upload image to Cloudinary
        const re = await UploadCloudinary.CloudinaryUploadPhoto(findImage)
        
        // Delete old photo if exists
        if(user.profilePhoto?.PublicId) {
            await UploadCloudinary.CloudinaryRemovePhoto(user.profilePhoto.PublicId)
        }

        // Update user profile photo
        user.profilePhoto = {
            url: re.secure_url,
            PublicId: re.public_id
        }
        await user.save()
        
        //remove image from local folder after upload
        fs.unlinkSync(findImage)
        
        return res.status(201).json({ message: "Uploaded successfully"});
    } catch (error) {
        res.status(422).json({ message: "Upload failed", error: `${error.message}` });
    }
};