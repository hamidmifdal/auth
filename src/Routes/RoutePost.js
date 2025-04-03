import { Router } from "express";
import * as AuthPost from '../Controllers/AuthPost.js'
import Auth from '../Middlewares/AuthenticationUser.js'
import {upload,uploadPhoto} from '../Controllers/AuthPhoto.js'
const router = Router()

//methods POST
router.post('/', Auth, AuthPost.PostCreate)

router.post('/image', Auth, upload.single("file") , uploadPhoto)

router.delete('/:id',Auth, AuthPost.DeletePost)
router.put('/:id', AuthPost.EditePost)
//methods GET
router.get('/',AuthPost.GetPost)

export default router; 