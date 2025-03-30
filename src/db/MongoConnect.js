import mongoose from "mongoose";

const MONGO_DB_URL = process.env.MONGO_DB_URL
const NODE_ENV = process.env.NODE_ENV

export const Connect = async () => {
    try {
        const db = await mongoose.connect(MONGO_DB_URL)
        var result_db = NODE_ENV === "production" ? `mongoose is connect ${db.connection.host}` : "db is connected";
        console.log(result_db)
    } catch (error) {
        var result_error = NODE_ENV ? "error db" : `Error: ${error}`
        console.log(result_error)
        process.exit(1)
    }
}