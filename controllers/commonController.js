const catchAsyncError = require("../middleware/catchAsyncError");
const userModel = require("../models/users");
const { CustomHttpError } = require("../utils/customError");
const sendToken = require("../utils/jwtToken");

const loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new CustomHttpError(400, "Please provide email and password"));
    }
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        return next(new CustomHttpError(401, "Invalid Credentials"));
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
        return next(new CustomHttpError(401, "Invalid Credentials"));
    }
    sendToken(user, 200, res);
});

module.exports = { loginUser }