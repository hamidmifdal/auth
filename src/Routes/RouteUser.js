import { Router } from "express";
import * as AuthUser from '../Controllers/AuthUser.js'
import Auth from "../Middlewares/AuthenticationUser.js";
const router = Router()

//methods POST
router.post('/signup', AuthUser.Signup)
router.post('/signin', AuthUser.Signin)
router.get('/user', AuthUser.getUser)
//methods GET
router.get('/profile', Auth, AuthUser.Profile)
export default router;
