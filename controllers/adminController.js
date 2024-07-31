const userModel = require("../models/users");
const { CustomHttpError } = require("../utils/customError");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const mongoose = require("mongoose");
const designationModel = require("../models/designations");
const { sendEmail } = require("../utils/sendMail");
const { randomBytes } = require("crypto");
const projectModel = require("../models/projects");
const leaveModel = require("../models/leaves");
const userProjectModel = require("../models/user_projects");

const getCounts = catchAsyncErrors(async (req, res, next) => {
    const designations = await designationModel.countDocuments();
    const employees = await userModel.find({ is_active: 1, role: 'user' });
    const projects = await projectModel.find({ is_active: 1 });
    res.status(200).json({
        success: true,
        data: { employees: employees.length, projects: projects.length, designations },
    });
});

const addDesignation = catchAsyncErrors(async (req, res, next) => {
    const { designation, manager } = req.body;
    if (!designation) {
        return next(new CustomHttpError(400, "Please write designation"));
    }
    const des = new designationModel({ name: designation, is_manager: manager });
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

const updateDesignation = catchAsyncErrors(async (req, res, next) => {
    const { designationId, designation } = req.body;
    const des = await designationModel.findByIdAndUpdate(
        new mongoose.Types.ObjectId(designationId),
        { name: designation },
        { new: true }
    );
    if (!des) {
        return next(new CustomHttpError(400, "Designation does not exist"));
    }
    res.status(200).json({
        success: true,
    });
});

const deleteEmployee = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const user = await userModel.findByIdAndUpdate(
        id,
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
    const employees = await userModel.find({ role: 'user', is_active: 1 }).populate("designation");
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
        success: true,
        data: project
    })
});

const getAllProjects = catchAsyncErrors(async (req, res, next) => {
    const projects = await projectModel.find({ is_active: 1 });
    res.status(200).json({
        success: true,
        data: projects
    })
})

const getProject = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const employees = await userProjectModel.find({ project: id })
        .populate({
            path: 'user',
            populate: {
                path: 'designation'
            }
        }).lean();

    const emps = [];
    employees.forEach((ele) => {
        let emp = ele.user;
        emp.projectJoinDate = ele.createdAt;
        emps.push(emp);
    })
    res.status(200).json({
        success: true,
        data: emps
    })
})

const editProject = catchAsyncErrors(async (req, res, next) => {
    const { name, description, startDate, duration, projectId } = req.body;
    const endDate = await projectModel.getEndDate(startDate, duration);
    console.log(projectId)
    const project = await projectModel.findOneAndUpdate({ _id: projectId }, { name, description, startDate, duration, endDate }, { new: true });
    if (!project) {
        return next(new CustomHttpError(400, "Project does not exist"));
    }
    res.status(200).json({
        success: true,
        data: project
    })
})

const deleteProject = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const project = await projectModel.findByIdAndUpdate(
        id,
        { is_active: 0 },
        { new: true }
    );
    if (!project) {
        return next(new CustomHttpError(400, "Project does not exist"));
    }
    res.status(200).json({
        success: true,
    });
});

const getAllLeave = catchAsyncErrors(async (req, res, next) => {
    const leaves = await leaveModel.find({}).populate("user").populate("approved_by");
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
            pending,
            approved,
            rejected
        }
    });
});

const updateProjectRequest = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
    await userProjectModel.findByIdAndUpdate(id, { is_approved: Number(status) }, { new: true });
    res.status(200).json({
        success: true
    })
})

const getProjectJoinRequests = catchAsyncErrors(async (req, res, next) => {
    const projects = await userProjectModel.find({ is_active: 1 }).populate("project").populate("reportingTo").populate("user").lean();
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
    getProject,
    deleteProject,
    updateDesignation,
    getCounts,
    getAllLeave,
    updateProjectRequest,
    getProjectJoinRequests
};
