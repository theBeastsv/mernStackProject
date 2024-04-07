import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must contain three letter"],
    maxLength: [30, "Name should not exceed 30 letter"],
  },
  email: {
    type: String,
    required: [true, "Please provide email id"],
    validate: [validator.isEmail, "Please provide valid email"],
  },
  phone: {
    type: Number,
    required: [true, "Please provide a mobile no"],
  },
  password: {
    type: String,
    minLength: [8, "Password must contain 8 letter"],
    maxLength: [30, "Password should not exceed 30 letter"],
    select: false,
  },
  role: {
    type: String,
    required: [true, "PLease provide role"],
    enum: ["Job Seeker", "Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

///Encrypting the pass;

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

///Compare password;

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

///Json web token generation
userSchema.methods.getJWTToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};
export const User = mongoose.model("User", userSchema);
