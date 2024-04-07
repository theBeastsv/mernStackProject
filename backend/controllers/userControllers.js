import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userModel.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwt.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;
  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill full form!"));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!"));
  }
  console.log(req.body);
  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });
  
  sendToken(user, 200, res, "User Registered Successfullly");
});
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email/passwored/role", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  //   console.log("User data is here ", user);
  if (!user) {
    return next(new ErrorHandler("Invlaid Email /Password ", 400));
  }
  const ispass = await user.comparePassword(password);

  if (!ispass) {
    return next(new ErrorHandler("INvalid email/Passowrd", 400));
  }
  if (user.role !== role) {
    return next(new ErrorHandler("User with this role doesnot found", 400));
  }

  sendToken(user, 200, res, "User Logged in successfully");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPRIE * 24 * 60 * 1000
      ),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "User logout successfully ",
    });
});
