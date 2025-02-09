import { compare, hash} from "bcrypt";
import User from "../user/user.model.js"
import { generateJwt } from "../helpers/generate-jwt.js";

export const registerStudent = async (req, res) => {
    try{
        const data = req.body;
        let profilePicture = req.file ? req.file.filename : null;
        const encryptedPassword = await hash(data.password, 10)
        data.password = encryptedPassword
        data.profilePicture = profilePicture
        const user = await User.create(data);

        return res.status(201).json({
            message: "User has been created",
            name: user.name,
            email: user.email
        })

    }catch(err){
        return res.status(500).json({
            message: "User registration failed",
            error: err.message

        })
    }
}

export const registerTeacher = async (req, res) => {
    try{
        const data = req.body
        data.role = "TEACHER_ROLE"
        let profilePicture = req.file ? req.file.fileName : null;
        const encryptedPassword = await hash(data.password, 10)
        data.password = encryptedPassword;
        data.profilePicture = profilePicture
        const user = await User.create(data);

        return res.status(201).json({
            message: "User has been created",
            name: user.name,
            email: user.email
        })

    }catch(err){
        return res.status(500).json({
            message: "User registration failed",
            error: err.message

        })
    }
}

export const login = async (req, res) =>{
    const body = req.body
    try{
        const email = body.email
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                message: "Credenciales invalidas",
                error: "No existe el usuario o el correo ingresado"
            })
        }

        const validPassword = await compare( body.password, user.password)


        if(!validPassword){
            return res.status(400).json({
                message: "Credenciales invalidas",
                error: "Contraseña incorrecta"
            })
        }

        const token = await generateJwt(user.id, user.email)

        return res.status(200).json({
            message: "login succesful",
            userDetails: {
                token: token,
                user: user
            }
            
        })
    }catch(err){
        return res.status(500).json({
            message: "Login failed, server error",
            error: err.message
        })
    }
}