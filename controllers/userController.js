const catchAsyncError = require("../middleware/catchAsyncError");
const projectModel = require("../models/projects");
const userProjectModel = require("../models/user_projects");
const userModel = require("../models/users");
const leaveModel = require("../models/leaves");
const cloudinary = require("cloudinary");

const fs = require("fs");
const path = require("path");
const { CustomHttpError } = require("../utils/customError");
const { default: mongoose } = require("mongoose");
const { sendEmail } = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");

const getProjects = catchAsyncError(async (req, res, next) => {
  const projects = await projectModel.find({ is_active: 1 });
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

  const projects = await userProjectModel.find({ user: req.user.id, is_active: 1 }).populate("project").populate("reportingTo").lean();
  const approved = [], pending = [], disapproved = [];
  projects.forEach((ele) => {
    if (ele.is_approved == 0) {
      pending.push(ele);
    } else if (ele.is_approved == 1) {
      approved.push(ele);
    } else {
      disapproved.push(ele);
    }
  })
  res.status(200).json({
    success: true,
    data: {
      pending, approved, disapproved
    }
  })

})

const getEmployeeProjects = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.params.empId);
  if (!user) {
    return next(new CustomHttpError(400, "This user does not exist"));
  }
  const assignedProjects = await userProjectModel.find({ user: req.params.empId, is_approved: 1 }).populate("project").lean();
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
    project.joinedOn = ele.joinDate;
    projects.push(project);
  })
  res.status(200).json({
    success: true,
    data: projects
  })
})


const getCounts = catchAsyncError(async (req, res, next) => {
  const projects = await userProjectModel.find({ user: req.user.id, is_approved: 1 }).populate("project").lean();
  let total = projects.length, active = 0, past = 0;
  projects.forEach((ele) => {
    if (ele.project.endDate < new Date()) {
      past++;
    } else {
      active++;
    }
  });

  res.status(200).json({
    success: true,
    data: { total, active, past }
  });
});



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
  const { project, reportingTo, techStack, joinDate, leaveDate } = req.body;
  const assignedProject = new userProjectModel({
    project,
    user: req.user.id,
    reportingTo,
    techStack,
    joinDate,
    leaveDate
  });
  await assignedProject.save();
  res.status(200).json({
    success: true,
  });
});

const getAllManagers = catchAsyncError(async (req, res, next) => {
  try {
    const employees = await userModel.find({
      role: 'user',
      _id: { $ne: req.user.id }
    }).populate("designation");

    const managers = employees.filter(employee => employee.designation.is_manager);

    res.status(200).json({
      success: true,
      data: managers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


const leaveProject = catchAsyncError(async (req, res, next) => {
  const { userProjectId } = req.params;
  const { leaveDate } = req.body;
  await userProjectModel.findByIdAndUpdate(userProjectId, { leaveDate, is_active: 0 });
  res.status(200).json({
    success: true
  })
})

const completeProfile = catchAsyncError(async (req, res, next) => {
  let { fullname, gender, education, contact, dob, address, state, city, pin, profile, profileCompleted } = req.body;
  const courses = JSON.parse(req.body.courses);
  profileCompleted = Number(profileCompleted);
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
      profile,
      profileCompleted
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

const getMyLeaves = catchAsyncError(async (req, res, next) => {
  const leaves = await leaveModel.find({ user: req.user.id, is_active: 1 }).populate("approved_by");
  const approved = [], pending = [], rejected = [];

  leaves.forEach((ele) => {
    if (ele.is_approved == 0) {
      pending.push(ele);
    } else if (ele.is_approved == 1) {
      approved.push(ele);
    } else {
      rejected.push(ele);
    }
  })

  res.status(200).json({
    success: true,
    data: {
      pending, approved, rejected
    }
  })
})

const addLeave = catchAsyncError(async (req, res, next) => {
  const { leaveType, from, to, reason } = req.body;
  const allManagers = await userProjectModel.find({ user: req.user.id });
  const uniqueManagersSet = new Set();
  allManagers.forEach(ele => {
    uniqueManagersSet.add(ele.reportingTo.toString());
  });
  const managers = Array.from(uniqueManagersSet);
  const leave = new leaveModel({ user: req.user.id, leaveType, from, to, reason, managers });
  leave.approved_by = null;
  await leave.save();
  res.status(200).json({
    success: true,
    data: leave
  })
})

const getEmployeeLeaves = catchAsyncError(async (req, res, next) => {
  const leaves = await leaveModel.find({
    managers: { $in: [new mongoose.Types.ObjectId(req.user.id)] }
  }).populate("approved_by").populate("user");

  const pending = [], approved = [], rejected = [];

  for (const ele of leaves) {
    if (ele.is_approved === 0) {
      pending.push(ele);
    } else if (ele.is_approved == 1) {
      approved.push(ele);
    } else {
      rejected.push(ele);
    }
  }
  res.status(200).json({
    success: true,
    data: {
      success: true,
      pending,
      approved,
      rejected
    }
  })
})


module.exports = {
  assignProject,
  getProjects,
  getMyProjects,
  getEmployees,
  completeProfile,
  getEmployeeProjects,
  leaveProject,
  getCounts,
  getAllManagers,
  addLeave,
  getMyLeaves,
  getEmployeeLeaves,
};
