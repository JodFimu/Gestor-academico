import { Router } from "express";
import { getUserById , getUsers, deleteUser, updatePassword, updateUser, updateProfilePicture,
    asingCourse } from "./user.controller.js";
import { getUserByIdValidator, deleteUserValidation, updateUserValidator, updatePasswordValidator,
    asingCourseValidator} from "../middlewares/user-validators.js";
import { deleteProfilePicture } from "../middlewares/picture-updates.js";

const router = Router()

router.get("/finduser/:uid", getUserByIdValidator, getUserById)
router.get("/", getUsers)
router.delete("/deleteUser/:uid", deleteUserValidation,deleteUser )
router.patch("/updatePassword/:uid",updatePasswordValidator, updatePassword )
router.put("/updateUser/:uid", updateUserValidator, updateUser )
router.patch("/updateProfilePicture/:uid", deleteProfilePicture, updateProfilePicture)
router.patch("/asingCourse/:uid", asingCourseValidator, asingCourse)

export default router