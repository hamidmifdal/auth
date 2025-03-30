import jwt from "jsonwebtoken";

export default function Auth(req, res, next){

    const JWT_SECURE = process.env.JWT_SECURE
    const token = req.cookies.token || req.signedCookies.token

    if(!token){
        return res.status(422).json({message:"Authentication required"})
    }
    try {
        const decode = jwt.verify(token,JWT_SECURE)
        req.user = decode
        next()
    } catch (error) {
        res.clearCookie('token')
        return res.status(401).json({message:`Invalid or expired token`})
    }
}