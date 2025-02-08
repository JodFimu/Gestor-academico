import jwt from "jsonwebtoken";

export const generateJwt = (uid = " ") =>{
    return new Promise((res,rej) => {
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
