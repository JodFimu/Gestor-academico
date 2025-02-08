import { Router } from "express";

import { createCourse } from "./course.controller.js";
import { createCourseValidator, courseIdValidator  } from "../middlewares/course-validators.js";

const router = Router()

router.post("/createCourse", createCourseValidator, uploadProfilePicture.single("courserPicture"), createCourse)  
router.get("/getCourses", getCourses)
router.get("/getCourseById/:cid",courseIdValidator, getCourseById)
router.delete("/deleteCourse/:cid",courseIdValidator, deleteCourse)


export default router