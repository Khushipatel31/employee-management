const catchAsyncError = require("../middleware/catchAsyncError");
const userModel = require("../models/users");
const leaveModel = require("../models/leaves");
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

const updateLeave = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
    const leave = await leaveModel.findById(id);
    leave.is_approved = Number(status);
    leave.approved_by = req.user.id;
    await leave.save();
    res.status(200).json({
        success: true,
        data: leave
    })
})

module.exports = { loginUser, updateLeave }