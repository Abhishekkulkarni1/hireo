import {catchAsyncError} from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.js"
import {Job} from "../models/jobModel.js"

export const getAllJobs = catchAsyncError(async(req, res, next) => {
    const jobs = await Job.find({expired: false})
    res.status(200).json({
        success: true,
        jobs,
    })
})

export const postJob = catchAsyncError(async(req, res, next) => {
    const {role} = req.user;
    if(role === "Job Seeker"){
        return next(new ErrorHandler("Job Seeker is not allowed to Post Job", 400))
    }
    const {title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo } = req.body
    if(!title || !description || !category || !country || !city || !location){
        return next(new ErrorHandler("Please provide all the necessary details for Job Posting", 400))
    }
    if((!salaryFrom || !salaryTo) && !fixedSalary){
        return next(new ErrorHandler("Please provide anything", 400))
    }
    if(salaryFrom && salaryTo && fixedSalary){
        return next(new ErrorHandler("Please provide any one type of salary"))
    }
    const postedBy = req.user._id;
    const job = await Job.create({
        title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo, postedBy
    })

    res.status(200).json({
        success: true,
        message: "Job posted successfully",
        job
    })
})

export const getMyJobs = catchAsyncError(async(req, res, next)=> {
    const {role} = req.user
    if(role === "Job Seeker"){
        return next(new ErrorHandler("Job Seeker is not allowed to Post Job", 400))
    }
    const myJobs = await Job.find({postedBy : req.user._id});
    res.status(200).json({
        success: true,
        myJobs,
    })
})

export const updateJobs = catchAsyncError(async(req, res, next)=> {
    const {role} = req.user
    if(role === "Job Seeker"){
        return next(new ErrorHandler("Job Seeker is not allowed to Post Job", 400))
    }
    const {id} = req.params 
    let job = await Job.findById(id);
    if(!job) {
        return next(new ErrorHandler("Job not found", 404))
    }
    job = await Job.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        job,
        message: "Job updated succesfully"
    })
})

export const deleteJob = catchAsyncError(async(req, res, next)=> {
    const {role} = req.user
    if(role === "Job Seeker"){
        return next(new ErrorHandler("Job Seeker is not allowed to Post Job", 400))
    }
    const {id} = req.params 
    let job = await Job.findById(id);
    if(!job) {
        return next(new ErrorHandler("Job not found", 404))
    }
    await job.deleteOne()
    res.status(200).json({
        success: true,
        message: "Job deleted Succesfully",
    })
})

export const getSingleJob = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    try {
      const job = await Job.findById(id);
      if (!job) {
        return next(new ErrorHandler("Job not found.", 404));
      }
      res.status(200).json({
        success: true,
        job,
      });
    } catch (error) {
      return next(new ErrorHandler(`Invalid ID / CastError`, 404));
    }
  });