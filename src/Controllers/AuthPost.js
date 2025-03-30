import { isValidObjectId } from 'mongoose'
import { PostSchimaCreate } from '../utils/VerifyShemaUser.js'
import Post from '../models/Post.js'

export async function PostCreate(req, res) {
    try {
        const verifySchema = PostSchimaCreate.parse(req.body)
        if(!isValidObjectId(req.user.id)){
            return res.status(422).json({message:"user is not required"})
        }
        if(!verifySchema){
            return res.status(422).json({message:"body is not required"})
        }
        const item = new Post({...verifySchema, auth : req.user.id})
        await item.save()
        return res.status(201).json({message:"Created is ok"})

    } catch (error) {
        return res.status(401).json({message:"error Create this post",error})
    }
}

export async function GetPost(req, res) {
    try {
        const items = await Post.find()
        return res.status(200).json(items)
    } catch (error) {
        return res.status(400).json({message:"error db: ",error})
    }
}
export async function DeletePost(req, res) {
    try {
        const { id } = req.params
        if(!isValidObjectId(id)){
            return res.status(422).json({message:"id is not found"})
        }
        const item = await Post.findByIdAndDelete(id)
        return res.status(200).json({message:"item is deleted",item})
    } catch (error) {
        return res.status(400).json({message:"error db: ",error})
    }
}
export async function EditePost(req, res) {
    try {
        const { id } = req.params
        const db = req.body
        if(!isValidObjectId(id)){
            return res.status(422).json({message:"id is not found"})
        }
        const item = await Post.findByIdAndUpdate(id,db,{new:true,runValidators:true,context:'query'})
        return res.status(200).json({message:"item is updated",item})
    } catch (error) {
        return res.status(400).json({message:"error db: ",error})
    }
}