import * as verifySchema from '../utils/VerifyShemaUser.js'
import Userdb from '../models/User.js'
import bcrypt from 'bcrypt';
import {z} from 'zod'
import jwt from 'jsonwebtoken';

const JWT_SECURE = process.env.JWT_SECURE
const NODE_ENV   = process.env.NODE_ENV

export async function Signup(req, res) {
    try {
        // Parse and validate the request body
        const validatedData = verifySchema.UserSchimaSignup.parse(req.body);
        const fr = await Userdb.findOne({username: validatedData.username});
        if(fr){
            return res.status(400).json({message: "user is aroled"});
        }
        const hashPassword = await bcrypt.hash(validatedData.password,12);
        // Create new user with validated data
        const save_item = new Userdb({
            ...validatedData, password: hashPassword });
        await save_item.save();
        
        return res.status(201).json({message: "save is ok"});
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(422).json({ 
                message: `Validation error`,
                errors: error.errors.map(err => `${err.message}`)
            });
        }
        return res.status(500).json({
            message: `Internal server error`,
            error: error.message
        });
    }
}

export async function Signin(req, res) {
    try {
        const validatedData = verifySchema.UserSchimaSignin.parse(req.body)
        const {username, password} = validatedData
        const validatedUser = await Userdb.findOne({username})
        if(!validatedUser || !validatedUser === ""){
            return res.status(422).json({message:"username or password is coreect"})
        }
        const compasePassword = await bcrypt.compare(password, validatedUser.password)
        if(!compasePassword){
            return res.status(422).json({message:"username or password is coreect"})
        }
        const token = jwt.sign({ user : username, id: validatedUser._id }, JWT_SECURE, { expiresIn:"5m" } )
        res.cookie("token", token, {
            httpOnly: true,
            signed: true,
        })
        return res.status(200).json({message:"login is susscfully"})
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors.map(
                err => `${err.path.join('.')}: ${err.message}`
            );
            return res.status(422).json({ 
                message: `Validation error`,
                // errors: error.errors.map(err => err.path[0]),
                error: errorMessages.join(', ')
                // errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`

                });// this=> )
        }
        return res.status(422).json({message:`error: ${error}`})
    }
}

export async function Profile(req,res) {
    try {
        const user = req.user.user
        return res.status(200).json({ message:`user: ${user}` })
    } catch (error) {
        return res.status(401).json({message:`error: ${error}`})
    }
}
export async function getUser(req,res) {
    try {
        const user = await Userdb.find()
        return res.status(200).json([{user}])
    } catch (error) {
        return res.status(401).json({message:`error: ${error}`})
    }
}