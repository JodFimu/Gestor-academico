import { Router } from "express";
import { login, registerStudent , registerTeacher} from "./auth.controller.js";
import { registerValidation, loginValidator } from "../middlewares/auth-validators.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js";
const router = Router()

router.post(
    "/registerStudent", 
    uploadProfilePicture.single("profilePicture"),   
    registerValidation, 
    deleteFileOnError,
    registerStudent
)


router.post(
    "/registerTeacher", 
    uploadProfilePicture.single("profilePicture"),   
    registerValidation, 
    deleteFileOnError,
    registerTeacher
)
router.post(
    "/login",
    loginValidator,
    login
)
    


export default router