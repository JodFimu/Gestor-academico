import rateLimit from "express-rate-limit";
import { body, check } from "express-validator";
import { emailExists, userNameExists, userExist } from "../helpers/db-validators.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { validarCampos } from "./validate-fields.js";

export const getUserByIdValidator = [
    check("uid").isMongoId().withMessage("No es un id valido"),
    check("uid").custom(userExist),
    validarCampos,
    deleteFileOnError
]

export const deleteUserValidation = [
    check("uid").isMongoId().withMessage("No es un id valido"),
    check("uid").custom(userExist),
    validarCampos,
    deleteFileOnError
]

export const updatePasswordValidator = [
    check("uid").isMongoId().withMessage("No es un id valido"),
    check("uid").custom(userExist),
    body("newPassword").isLength({min: 8}).withMessage("el password debe contener 8 caracteres"),
    validarCampos,
    deleteFileOnError
]

export const updateUserValidator = [
    check("uid").isMongoId().withMessage("No es un id valido"),
    check("uid").custom(userExist),
    body("email").optional().isEmail().withMessage("Invalid Email"),
    body("email").custom(emailExists),
    body("userName").custom(userNameExists),
    validarCampos,
    deleteFileOnError
]

export const apiLimiter = rateLimit({
    windowMs: 15*60*1000,
    max: 50
})

export const asingCourseValidator = [
    check("uid").isMongoId().withMessage("No es un id valido"),
    check("uid").custom(userExist),
    body("cid").isMongoId().withMessage("No es un id valido"),
    validarCampos,
    deleteFileOnError
]
