import { Router } from "express";
import * as AuthPost from '../Controllers/AuthPost.js'
import Auth from '../Middlewares/AuthenticationUser.js'
const router = Router()

import Post from "../models/Post.js";


//methods POST
router.post('/', Auth, AuthPost.PostCreate)
router.delete('/:id',Auth, AuthPost.DeletePost)
router.put('/:id', AuthPost.EditePost)
//methods GET
router.get('/',AuthPost.GetPost)



router.post('/att', async (req, res) => {
    try {
        const vvv = req.body
        if(!vvv){
            return res.status(422).json({message:"body is not required"})
        }
        const item = new Post({vvv})
        await item.save()
        return res.status(201).json({message:"Created is ok",item})

    } catch (err) {
        return res.status(401).json({message:"error Create this post"})
    }
})

export default router; 