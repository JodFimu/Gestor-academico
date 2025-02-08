import User from "../user/user.model.js"

export const emailExists = async(email = "") => {
    const exists = await User.findOne({email})
    if (exists) {
        throw new Error(`El email ${email} ya esta en uso`)
    }
}

export const userNameExists = async(username = "") =>{
    const exists = await User.findOne({username})
    if (exists) {
        throw new Error(`El username ${username} ya esta en uso`)
    }
}

export const userExist = async (uid = " ") =>{
    const exists = await User.findById(uid)
    if(!exists){
        throw new Error("El usuario no existe")
    }
}