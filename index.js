import express from 'express'
import mongoose from "mongoose"
import router from "./app/router.js"
import cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config()

const PORT = 5000
const DB_URL = `mongodb+srv://cainaican:admin@cluster0.yhvuzxv.mongodb.net/?retryWrites=true&w=majority`

const app = express()
app.use(cors())
app.use(express.json());
app.use('/api', router);



async function startApp(){
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true})
        app.listen(PORT, () => console.log("Server started on port " + PORT))
    }
    catch (e){
        console.log(e);
    }
}

startApp()
