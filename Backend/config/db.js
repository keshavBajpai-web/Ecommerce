import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config() 
const CONNECTION = process.env.CONNECTION_SRTING
const CONNECTDB = async () => {
    try {
        await mongoose.connect(CONNECTION)
        console.log("connected to the db");
    } catch (error) {
        console.log(`not connected to the db`,error);
    }
}
export default CONNECTDB
