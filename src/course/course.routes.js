import { Router } from "express";

import { uploadCousePicture } from "../middlewares/multer-uploads.js";
import { createCourse, getCourseById, getCourses, deleteCourse, updateCourse, getCourseByTeacher, getStudentCourses } from "./course.controller.js";
import { createCourseValidator, courseIdValidator, updateCourseValidator  } from "../middlewares/course-validators.js";

const router = Router()

router.post("/createCourse", uploadCousePicture.single("coursePicture"), createCourseValidator,  createCourse)  
router.get("/getCourses", getCourses)
router.get("/getCourseById/:cid",courseIdValidator, getCourseById)
router.delete("/deleteCourse/:cid",courseIdValidator, deleteCourse)
router.put("/updateCourse/:cid",updateCourseValidator, updateCourse)
router.get("/getCoursesByTeacher/:tid", getCourseByTeacher)
router.get("/getStudentCourses/:uid", getStudentCourses)


export default router