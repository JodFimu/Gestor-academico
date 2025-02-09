import User from "./user.model.js"
import { hash } from "bcrypt";

export const getUserById = async (req, res) =>{
    try{
        const { uid } = req.params;
        const user = await User.findById(uid)

        if(!user){
            return res.status(400).json({
                success: false,
                message: "usuario no encontrado"
            })       
         }

        return res.status(200).json({
            success: true,
            user
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Erroral obtener al usuario",
            error: err 
        })
    }
}

export const getUsers = async (req,res) =>{
    try{
        const {limite=5, desde=0}= req.query
        const query = {status:true}

        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            users
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los usuarios",
            error: err.message
        })
    }
}

export const deleteUser = async (req,res) =>{
    try{
        const {uid} = req.params 

        const user = await User.findByIdAndUpdate(uid,{ status: false}, {new:true} ) 

        return res.status(200).json({
            succes: true,
            message: "usuario eliminado",
            user
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar al usuario",
            error: err.message
        })
    }
}

export const updateUser = async (req, res) =>{
    try{
        const {uid} = req.params
        const {body} = req


        const user = await User.findByIdAndUpdate(uid, body, {new: true})  

        return res.status(200).json({   
            success: true,
            message: "Usuario actualizado",
            user
        }
        )
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar al usuario",
            error: err.message
        })
    }
}

export const updatePassword = async (req, res) =>{
    try {
        const {uid} = req.params
        const {newPassword} = req.body

        const encryptedPassword = await hash(newPassword, 10)

        await User.findByIdAndUpdate(uid, {password:encryptedPassword}, {new: true})

        return res.status(200).json({
            succes:true,
            message: "Contraseña actualizada"
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la  contraseña",
            error: err.message
        })
    }
}

export const updateProfilePicture = async (req, res) =>{
    try{
        const { uid } = req.params;
        const { filename } = req.file;

        const user = await User.findById(uid);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        user.profilePicture = filename;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Foto de perfil actualizada",
            user
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la foto de perfil",
            error: err.message
        });
    }
}

export const asingCourse = async (req, res) =>{ 
    try{
        const {uid} = req.params
        const {cid} = req.body

        const student = await User.findById(uid)

        if(student.role !== "STUDENT_ROLE"){
            return res.status(400).json({
                success: false,
                message: "El usuario no es un estudiante"
            })
        }

        if(student.course.includes(cid)){
            return res.status(400).json({
                success: false,
                message: "El estudiante ya tiene este curso asignado"
            })
        }

        if(student.course.length >= 3){
            return res.status(400).json({
                success: false,
                message: "El estudiante ya tiene 3 cursos asignados"
            })
        }

        const user = await User.findByIdAndUpdate(uid, {$push:{course: cid}} , {new: true})

        return res.status(200).json({
            success: true,
            message: "Curso asignado",
            user
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al asignar el curso",
            error: err.message
        })
    }
}