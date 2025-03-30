import { Router } from "express";
import * as AuthUser from '../Controllers/AuthUser.js'
import Auth from "../Middlewares/AuthenticationUser.js";
const router = Router()

//methods POST
router.post('/signup', AuthUser.Signup)
router.post('/signin', AuthUser.Signin)
//methods GET
router.get('/profile', Auth, AuthUser.Profile)
export default router;
