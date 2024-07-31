const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const crypto = require("crypto")

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, trim: true },
    email: { type: String, trim: true, unique: true },
    password: { type: String, select: false, },
    gender: { type: String, enum: ["female", "male", "other"] },
    is_active: { type: Number, default: 1 },
    role: { type: String, default: "user" },
    profileCompleted: { type: Number, default: 0 },
    designation: { type: mongoose.SchemaTypes.ObjectId, ref: "designations" },
    projects: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "projects",
      },
    ],
    courses: [String],
    education: String,
    contact: Number,
    dob: Date,
    profile:
    {
      public_id: {
        type: String,
        require: true,
      },
      url: {
        type: String,
        require: true,
      }
    },
    address: String,
    state: String,
    city: String,
    pin: Number,
    joinDate: Date,
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//JWT generation and storing in cookie
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getresetPasswordToken = function () {
  const token = crypto.randomBytes(20).toString("hex");//new token using crypto 
  this.resetPasswordToken = crypto.createHash('sha256').update(token).digest("hex");//using sha256 algorithm and updating hash by token
  this.resetPasswordExpire = Date.now() + Date.now() + 15 * 60 * 1000;//setting expiry after 15 minutes
  //by using this. the extra properties are added but not saved to database so look at user Controller
  return token;
};

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
