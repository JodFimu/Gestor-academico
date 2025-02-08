import { validarCampos } from "./validate-fields.js" 
import {body, check} from "express-validator"

export const createCourseValidator = [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("description").not().isEmpty().withMessage("Description is required"),
    body("teacher").isMongoId().withMessage("Invalid teacher id"),
    validarCampos
]

export const courseIdValidator = [
    check("cid").isMongoId().withMessage("Invalid course id"),
    validarCampos
]