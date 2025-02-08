import { Schema, model, version} from "mongoose";

const courseSchema = new Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [50, "Name cannot exceed 50 characters"]
    },
    description:{
        type: String,
        required: [true, "Description is required"],
        maxLength: [255, "Description cannot exceed 255 characters"]
    },
    coursePicture:{
        type: String
    },
    status:{
        type: Boolean,
        default: true
    },
    teacher:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    versionKey: false,
    timeStamps: true
});

courseSchema.methods.toJSON = function(){
    const {__v,...course} = this.toObject()
    return course
}

export default model("Course", courseSchema)