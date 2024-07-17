const catchAsyncError = require("../middleware/catchAsyncError");
const projectModel = require("../models/projects");
const userProjectModel = require("../models/user_projects");
const userModel = require("../models/users");

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

module.exports = {
  assignProject,
  getProjects,
  getMyProjects
};
