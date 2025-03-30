import express from 'express'
import  { Connect } from './db/MongoConnect.js'
import userauth from './Routes/RouteUser.js'
import postauth from './Routes/RoutePost.js'
import helmet from 'helmet'
import notFoundHandler from './utils/notFoundHandler.js'
import errorHandler from './utils/errorHandler.js'
import cookieParser from 'cookie-parser'
import 'dotenv/config'

const COOKIE_SECRET = process.env.COOKIE_SECRET
const check = {
    global: [helmet(),express.json(),cookieParser(COOKIE_SECRET)],
    error : [notFoundHandler,errorHandler]
}
const PORT = process.env.PORT
const app = express()
app.use(express.json())
check.global.forEach(mw => app.use(mw));

app.use('/api/auth/user', userauth)
app.use('/api/auth/post', postauth)

check.error.forEach(mw => app.use(mw))


app.listen(PORT,()=>{
    console.log(`server is run: http://localhost:${PORT}`)
    Connect()
})