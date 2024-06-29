import mongoose from "mongoose"

const jobSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Please provide job title"],
        minLength: [3, 'Job Title must contain at least 3 characters'],
        maxLenght: [50, 'Job title must be less than 50 characters']
    },
    description:{
        type: String,
        required: [true, "Please provide job description"],
        minLength: [50, 'Job description must contain at least 50 characters'],
        maxLenght: [300, 'Job description must be less than 300 characters']
    }, 
    category:{
        type: String,
        required: [true, "Job Category"],
    },
    country:{
        type: String,
        required: [true, "Job location"]
    },
    city:{
        type: String,
        required: [true, "Job location"]
    },
    location:{
        type: String,
        required: [true, "Exact Job location"]
    },
    fixedSalary:{
        type: Number,
        minLength: [5, "Fixed Salary must have 5 digits"],
        maxLength: [10, "Fixed Salary cannot exceed 10 digits"]
    },
    salaryFrom:{
        type: Number,
        minLength: [5, "Salary from must have 5 digits"],
        maxLength: [10, "Salary from cannot exceed 10 digits"]
    },
    salaryTo:{
        type: Number,
        minLength: [5, "Salary To must have 5 digits"],
        maxLength: [10, "Salary To cannot exceed 10 digits"]
    },
    expired:{
        type: Boolean,
        default: false,
    },
    jobPostedOn:{
        type: Date,
        default: Date.now,
    },
    postedBy:{
        type: mongoose.Schema.ObjectId,
        refernce: "User",
        required: true,
    },
})

export const Job = mongoose.model("Job", jobSchema)