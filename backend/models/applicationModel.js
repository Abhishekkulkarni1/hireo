import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
        minLength: [3, "Name must contain at least 3 characters"],
        maxLength: [30, "Name must contain at max 30 characters"],
    },
    email: {
        type: String,
        validator: [validator.isEmail, "Provide a valid email"],
        required: [true, "Provide email"]
    },
    coverletter:{
        type: String,
        required: false
    },
    phone:{
        type: Number,
        required: [true, "Provide your number"],
    },
    address:{
        type: String,
        required: [true, "Provide yout current address"]
    },
    resume:{
        public_id:{
            type: String,
            required: true,
        },
        url:{
            type: String,
            required: true,
        },
    },
    applicantId: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role:{
            type:String,
            enum: ["Job Seeker"],
            required: true,
        }
    },
    employerId:{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role:{
            type: String,
            enum: ["Job Employer"],
            required: true,
        }
    }
})

export const Application = mongoose.model("Application", applicationSchema)