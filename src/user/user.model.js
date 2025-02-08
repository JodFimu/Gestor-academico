import { Schema, model, version} from "mongoose";

const userSchema = Schema({ 
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    surname:{
        type: String,
        required: [true, "Surname is required"],
        maxLength: [25, "Surname cannot exceed 25 characters"]
    },
    email:{
        type: String,
        required: [true, "Email es required"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    profilePicture:{
        type: String
    },
    phone:{
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    role:{
        type: String,
        required: true,
        default: "STUDENT_ROLE",
        enum: ["STUDENT_ROLE", "TEACHER_ROLE"]
    },
    status:{
        type: Boolean,
        default: true
    },
    course:[{
        type: Schema.Types.ObjectId,
        ref: "Course"
    }]

},
{
    versionKey: false,
    timeStamps: true

})

userSchema.methods.toJSON = function(){
    const {__v,_password,_id,...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

export default model("User", userSchema)