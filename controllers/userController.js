const catchAsyncError = require("../middleware/catchAsyncError");
const projectModel = require("../models/projects");
const userProjectModel = require("../models/user_projects");
const userModel = require("../models/users");
const cloudinary = require("cloudinary");
const fs = require("fs");
const path = require("path");
const { CustomHttpError } = require("../utils/customError");

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
  const assignedProjects = await userProjectModel.find({ user: req.user.id }).populate("project").lean();
  const myProjects = [];
  assignedProjects.forEach((ele) => {
    const project = {
      ...ele.project,
    }
    if (ele.project.endDate < new Date()) {
      project.status = "Completed";
    } else {
      project.status = "Ongoing"
    };
    project.joinedOn = ele.createdAt;
    myProjects.push(project);
  })
  res.status(200).json({
    success: true,
    data: myProjects
  })
})

const getEmployeeProjects = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.params.empId);
  if (!user) {
    return next(new CustomHttpError(400, "This user does not exist"));
  }
  const assignedProjects = await userProjectModel.find({ user: req.params.empId }).populate("project").lean();
  const projects = [];
  assignedProjects.forEach((ele) => {
    const project = {
      ...ele.project,
    }
    if (ele.project.endDate < new Date()) {
      project.status = "Completed";
    } else {
      project.status = "Ongoing"
    };
    project.joinedOn = ele.createdAt;
    projects.push(project);
  })
  res.status(200).json({
    success: true,
    data: projects
  })
})


const getEmployees = catchAsyncError(async (req, res, next) => {
  const employees = await userModel.find({
    role: 'user', is_active: 1, _id: { $ne: req.user.id }
  }).populate("designation");
  res.status(200).json({
    success: true,
    data: employees,
  });
})

const assignProject = catchAsyncError(async (req, res, next) => {
  const { project } = req.body;
  const assignedProject = new userProjectModel({ project, user: req.user._id });
  await assignedProject.save();
  res.status(200).json({
    success: true,
  });
});

const completeProfile = catchAsyncError(async (req, res, next) => {
  let { fullname, gender, education, contact, dob, address, state, city, pin, profile } = req.body;
  const courses = JSON.parse(req.body.courses);
  if (req.file) {
    const myCloud = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "employeeProfile",
      width: 150,
      crop: "scale",
    });
    profile = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    }
  }

  const updatedEmployee = await userModel.findByIdAndUpdate(
    req.user.id,
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
      profile
    },
    { new: true }
  );

  if (req.file) {
    fs.unlink(path.join(__dirname, '../public/uploads/', req.file.filename), (err) => {
      if (err) {
        console.error('Failed to delete file:', err);
      } else {
        console.log('File deleted successfully');
      }
    });
  }


  res.status(200).json({
    success: true,
    data: updatedEmployee,
  });

})

module.exports = {
  assignProject,
  getProjects,
  getMyProjects,
  getEmployees,
  completeProfile,
  getEmployeeProjects
};
