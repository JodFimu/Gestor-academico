'use strict'

import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import { dbConecction } from "./mongo.js";
import { apiLimiter } from "../src/middlewares/validators.js";
import authRoutes from "../src/auth/auth.routes.js";
import userRoutes from "../src/user/user.routes.js";
import courseRoutes from "../src/course/course.routes.js";

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const conectarDB = async () => {
    try{
        await dbConecction()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

const routes = (app) => {
    app.use("/gestorAcademico/v1/auth", authRoutes)
    app.use("/gestorAcademico/v1/user", userRoutes)
    app.use("/gestorAcademico/v1/course", courseRoutes)
}

export const initServer = async () => {
    const app = express()
    try{
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`Server failed: ${err}`)
        process.exit(1)
    }   
}