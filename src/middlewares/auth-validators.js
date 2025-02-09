import { body } from "express-validator";
import { emailExists, userNameExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";

export const registerValidation = [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("email").not().isEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("email").custom(emailExists),
    body("userName").custom(userNameExists),
   validarCampos
]

export const loginValidator = [
    body("email").isEmail().withMessage("invalid Email"),
    body("password").not().isEmpty().withMessage("Password is required"),
    validarCampos
]