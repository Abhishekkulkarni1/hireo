import {catchAsyncError} from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.js"
import {User} from "../models/userModel.js"
import {sendToken} from "../utils/jwtToken.js"

// user register func
export const register = catchAsyncError(async(req, res, next) => {
    const {name, email, phone, role, password} = req.body
    if(!name || !email || !phone || !role || !password){
        return next(new ErrorHandler("Please fill all the required data"))
    }
    const isEmail = await User.findOne({email})
    if(isEmail){
        return next(new ErrorHandler("Email already exists, Please Login"))
    }
    const user = await User.create({
        name, email, phone, role, password
    });
    sendToken(user, 200, res, "User registered succesfully")
})

// user login func
export const login = catchAsyncError(async(req, res, next)=> {
    const {email, password, role} = req.body;
    if(!email || !password || !role){
        return next(new ErrorHandler("Please provide all the required items", 400))
    }
    const user = await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid email or password", 400))
    }
    const isPasswordMatched = await user.passwordComparison(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password", 400))
    }
    if (user.role !== role) {
        return next(
          new ErrorHandler(`User with this email and ${role} not found!`, 404)
        );
    }
    sendToken(user, 201, res, "User Logged In!");
});

// user logout func
export const logout = catchAsyncError(async (req, res, next) => {
    res
      .status(201)
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: true,
        sameSite: "None"
      })
      .json({
        success: true,
        message: "Logged Out Successfully.",
      });
  });
  
  
  export const getUser = catchAsyncError((req, res, next) => {
    const user = req.user;
    res.status(200).json({
      success: true,
      user,
    });
  });