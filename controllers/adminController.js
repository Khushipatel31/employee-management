const userModel = require("../models/users");
const { CustomHttpError } = require("../utils/customError");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const mongoose = require("mongoose");
const designationModel = require("../models/designations");
const { sendEmail } = require("../utils/sendMail");
const { randomBytes } = require("crypto");
const projectModel = require("../models/projects");
const userProjectModel = require("../models/user_projects");

const addDesignation = catchAsyncErrors(async (req, res, next) => {
    const { designation } = req.body;
    if (!designation) {
        return next(new CustomHttpError(400, "Please write designation"));
    }
    const des = new designationModel({ name:designation });
    await des.save();
    res.status(200).json({
        success: true,
    });
});

const getDesignations = catchAsyncErrors(async (req, res, next) => {
    const designations = await designationModel.find({});
    res.status(200).json({
        success: true,
        data: designations,
    });
});

const deleteEmployee = catchAsyncErrors(async (req, res, next) => {
    const { userId } = req.body;
    const user = await userModel.findByIdAndUpdate(
        userId,
        { is_active: 0 },
        { new: true }
    );
    if (!user) {
        return next(new CustomHttpError(400, "Employee does not exist"));
    }
    res.status(200).json({
        success: true,
    });
});

const getAllEmployee = catchAsyncErrors(async (req, res, next) => {
    const employees = await userModel.find({}).populate("designation");
    res.status(200).json({
        success: true,
        data: employees,
    });
});

const addEmployee = catchAsyncErrors(async (req, res, next) => {
    const { email, fullname, designation, joinDate } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
        return next(
            new CustomHttpError(400, "Employee with this mail already exists")
        );
    }
    const password = randomBytes(5).toString("hex");
    const employee = new userModel({
        email,
        fullname,
        designation,
        joinDate,
        password,
    });

    await employee.save();
    const message = `Your credentials are : \n\n <h1>email: </h1>${email}\n\n <h1>password: </h1>${password}\n\n`;
    await sendEmail({
        email,
        subject: "credentials",
        message,
    });

    res.status(200).json({
        success: true,
        data: employee,
    });
});

const updateEmployee = catchAsyncErrors(async (req, res, next) => {
    const { designation, joinDate, userId } = req.body;
    const employee = await userModel.findOneAndUpdate(
        { _id: userId },
        { designation, joinDate },
        { new: true }
    );
    if (!employee) {
        return next(new CustomHttpError(400, "Employee does not exist"));
    }
    res.status(200).json({
        success: true,
        data: employee,
    });
});

const addProject = catchAsyncErrors(async (req, res, next) => {
    const { name, description, startDate, duration } = req.body;
    const endDate = await projectModel.getEndDate(startDate, duration);
    const project = await projectModel.create({ name, description, startDate, duration, endDate });
      await project.save();
      res.status(200).json({
        success:true,
        data:project
      })
});

const getAllProjects=catchAsyncErrors(async(req,res,next)=>{
    const projects=await projectModel.find({});
    res.status(200).json({
        success:true,
        data:projects
    })
})

const getProject=catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params;
    const employees=await userProjectModel.find({project:id}).populate("user");
    res.status(200).json({
        success:true,
        data:employees
    })
})

const editProject=catchAsyncErrors(async(req,res,next)=>{
    const { name, description, startDate, duration,projectId } = req.body;
    const endDate = await projectModel.getEndDate(startDate, duration);
    console.log(projectId)
    const project = await projectModel.findOneAndUpdate({_id:projectId},{name,description,startDate,duration,endDate},{new:true});
    if(!project){
        return next(new CustomHttpError(400, "Project does not exist"));
    }
    res.status(200).json({
        success:true,
        data:project
      })
})

module.exports = {
    addDesignation,
    getDesignations,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getAllEmployee,
    addProject,
    editProject,
    getAllProjects,
    getProject
};
