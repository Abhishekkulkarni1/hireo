import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter your name"],
    minLength: [3, "Your name must contain more than 3 characters"],
    maxLength: [30, "Your name must contain less than 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Enter your Email"],
    validate: [validator.isEmail, "Please provide a vaild email"],
  },
  phone: {
    type: Number,
    required: [true, "Enter your mobile number"],
  },
  password: {
    type: String,
    required: [true, "Enter your password"],
    minLength: [8, "Your password must contain more than 8 characters"],
    maxLength: [12, "Your password must contain less than 12 characters"],
    select: false,
  },
  role: {
    type: String,
    required: [true, "Please provide your role"],
    enum: ["Job Seeker", "Job Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
// for passwordComparison
userSchema.methods.passwordComparison = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
// jwt token for auth
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

export const User = mongoose.model("User", userSchema);