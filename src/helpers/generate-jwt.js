import jwt from "jsonwebtoken";

export const generateJwt = (uid = " ", email) =>{
    return new Promise((resolve,reject) => {
        const payload = { uid, email}

        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: "1h"
            },
            (err, token) =>{
                if(err){
                    reject({
                        success: false,
                        message: err
                    })
                }else{
                    resolve(token)
                }
            }
        )
    })
}
