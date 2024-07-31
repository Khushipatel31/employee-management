const catchAsyncError = require("../middleware/catchAsyncError");
const userModel = require("../models/users");
const leaveModel = require("../models/leaves");
const { CustomHttpError } = require("../utils/customError");
const sendToken = require("../utils/jwtToken");
const crypto = require("crypto");
const { sendEmail } = require("../utils/sendMail");

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
const forgotPassword = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return next(new CustomHttpError(404, "No User exists"));
    }
    const resetToken = user.getresetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetPasswordUrl =
        req.protocol + "://" + "localhost:3000" + "/password/reset/" + resetToken;
    const message = `Your password reset token is : \n\n ${resetPasswordUrl}\n\n If you did not request for forgot password please ignore this mail`;
    await sendEmail({
        email,
        subject: "Reset you password",
        message
    })
    res.status(200).json({
        success: true
    })
})

const resetPassword = catchAsyncError(async (req, res, next) => {
    const { newPassword, confirmPassword } = req.body;
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await userModel.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    if (!user) {
        return next(
            new CustomHttpError(
                400,
                "Reset password token is invalid or has been expired"
            )
        );
    }
    if (newPassword !== confirmPassword) {
        return next(new CustomHttpError(400, "Password does not match"));
    }
    user.password = newPassword;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    sendToken(user, 200, res);
})

module.exports = { loginUser, updateLeave, forgotPassword, resetPassword }