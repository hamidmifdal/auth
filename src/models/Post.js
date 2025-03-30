import {Schema, model} from "mongoose";

const SchemaPost = new Schema({
    title:{
        type : String,
        required : true,
    },
    desc:{
        type : String,
        required : true,
    },
    auth:{
        type : String,
        required : true,
    }
},{timestamps: true})

const Post = model("Post", SchemaPost)
export default Post;