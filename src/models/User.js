import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: Object,
        default: {
            url: "https://static.vecteezy.com/system/resources/previews/005/544/718/large_2x/profile-icon-design-free-vector.jpg",
            publicId: null  // Changed from 'PublicId' to 'publicId' (camelCase is conventional)
        }
    }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);  // Fixed typo: 'UserSchima' to 'UserSchema'
export default User;