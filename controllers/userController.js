const catchAsyncError = require("../middleware/catchAsyncError");
const projectModel = require("../models/projects");
const userProjectModel = require("../models/user_projects");
const userModel = require("../models/users");
const cloudinary=require("cloudinary");
const fs=require("fs");
const path=require("path")

const getProjects = catchAsyncError(async (req, res, next) => {
  const projects = await projectModel.find({});
  const assignedToMe = await userProjectModel.find({ user: req.user._id });
  const notAssignedToMe = [];
  projects.forEach((ele) => {
    let flag = 0;
    assignedToMe.forEach((myProject) => {
      if (myProject.project.toString() == ele._id.toString()) {
        flag = 1;
      }
    });
    if (flag == 0) {
      if (ele.endDate > new Date()) {
        notAssignedToMe.push(ele);
      }
    }
  });
  res.status(200).json({
    success: true,
    data: notAssignedToMe,
  });
});


const getMyProjects = catchAsyncError(async (req, res, next) => {
  const assignedProjects = await userProjectModel.find({ user: req.user._id }).populate("project");
  const myProjects = [];
  assignedProjects.forEach((ele) => {
    myProjects.push(ele.project);
  })
  res.status(200).json({
    success: true,
    data: myProjects
  })
})

const assignProject = catchAsyncError(async (req, res, next) => {
  const { project } = req.body;
  const assignedProject = new userProjectModel({ project, user: req.user._id });
  await assignedProject.save();
  res.status(200).json({
    success: true,
  });
});

const completeProfile=catchAsyncError(async(req,res,next)=>{
  const { fullname, gender, courses, education, contact, dob, address, state, city, pin } = req.body;
  const myCloud = await cloudinary.v2.uploader.upload(req.file.path, {
    folder: "employeeProfile",
    width: 150,
    crop: "scale",
  });

  const updatedEmployee = await userModel.findOneAndUpdate(
    {_id:req.user._id},
    {
      fullname,
      gender,
      courses,
      education,
      contact,
      dob,
      address,
      state,
      city,
      pin,
      profile: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      }
    },
    { new: true }
  );

  fs.unlink(path.join(__dirname, '../public/uploads/', req.file.filename), (err) => {
    if (err) {
      console.error('Failed to delete file:', err);
    } else {
      console.log('File deleted successfully');
    }
  });

  res.status(200).json({
    success: true,
    data: updatedEmployee,
  });

})

module.exports = {
  assignProject,
  getProjects,
  getMyProjects,
  completeProfile
};