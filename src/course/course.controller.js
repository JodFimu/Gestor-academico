import Course from "./course.model.js";    
import User from "../user/user.model.js";

export const createCourse = async (req, res) => {
    try{
        const data = req.body
        let coursePicture = req.file ? req.file.fileName : null;

        data.coursePicture = coursePicture

        const course = await Course.create(data);

        return res.status(201).json({
            success: true,
            message: "Curso creado exitosamente",
            course
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al crear el curso",
            error: err.message
        })
    }
}

export const getCourses = async (req, res) => {
    try{
        const {limite=5, desde=0}= req.query
        const query = {status:true}

        const [total, courses] = await Promise.all([
            Course.countDocuments(query),
            Course.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            courses
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los cursos",
            error: err.message
        })
    }
}

export const getCourseById = async (req, res) => {
    try{
        const { cid } = req.params;
        const course = await Course.findById(cid)

        if(!course){
            return res.status(400).json({
                success: false,
                message: "Curso no encontrado"
            })       
         }

        return res.status(200).json({
            success: true,
            course
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener el curso",
            error: err 
        })
    }
}

export const deleteCourse = async (req, res) => {  
    try{
        const {cid} = req.params 

        const course = await Course.findByIdAndUpdate(cid,{ status: false}, {new:true} )    

        const users = await User.find({course:cid})

        await Promise.all(users.map(async user => {
            user.course = user.course.filter(course => course != cid);
            await user.save();
        }));

        return res.status(200).json({
            success: true,
            message: "Curso eliminado exitosamente",
            course
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el curso",
            error: err.message
        })
    }
}

export const updateCourse = async (req, res) => {
    try{
        const {cid} = req.params
        const {body} = req

        const course = await Course.findByIdAndUpdate(cid , body, {new: true})
        
        res.status(200).json({
            success: true,
            message: "Curso actualizado exitosamente",
            course
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar el curso",
            error: err.message
        })
    }   
}

export const getCourseByTeacher = async (req, res) => {
    try{
        const {tid} = req.params

        const user = await User.findById(tid)

        if(user.role !== "TEACHER_ROLE"){
            return res.status(400).json({
                success: false,
                message: "No es un profesor"
            })
        }

        const query = {teacher:tid, status:true}

        const courses = await Course.find(query)

        return res.status(200).json({
            success: true,
            message: "Cursos del profesor" + user.name + " " + user.surname,
            courses
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los cursos",
            error: err.message
        })
    }
}

export const getStudentCourses = async (req, res) => {
    try{
        const {uid} = req.params

        const user = await User.findById(uid)

        if(user.role !== "STUDENT_ROLE"){
            return res.status(400).json({
                success: false,
                message: "No es un estudiante"
            })
        }

        const query = {student:uid, status:true}

        const courses = await Course.find(query)

        if(courses.length === 0){
            return res.status(400).json({
                success: false,
                message: "El estudiante no tiene cursos"
            })
        }

        res.status(200).json({
            success: true,
            message: "Cursos del estudiante" + user.name + " " + user.surname,
            courses
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los cursos",
            error: err.message
        })
    }
}
