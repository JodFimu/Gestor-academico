import { body } from "express-validator";
import { emailExists, userNameExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";

export const registerValidation = [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("userName").not().isEmpty().withMessage("Username is required"),
    body("email").not().isEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("email").custom(emailExists),
    body("userName").custom(userNameExists),
    /*body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1

    })*/
   validarCampos
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("invalid Email"),
    body("userName").optional().isString().withMessage("Invalid username"),
    body("password").isLength({min: 8}).withMessage("La contraseña debe contener al menos 8 caracteres"),
    validarCampos
]