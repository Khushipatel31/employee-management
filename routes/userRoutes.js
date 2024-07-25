const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")
const commonController = require("../controllers/commonController")
const { verify, isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const upload = require("../utils/multerConfig")
router.get("/verify", isAuthenticatedUser, verify);
router.get("/counts", isAuthenticatedUser, userController.getCounts)
router.get("/projects", isAuthenticatedUser, userController.getProjects)
router.post("/assignProject", isAuthenticatedUser, userController.assignProject)
router.put("/leaveProject/:userProjectId", isAuthenticatedUser, userController.leaveProject)
router.get("/getProjects/:empId", isAuthenticatedUser, userController.getEmployeeProjects)
router.get("/myProjects", isAuthenticatedUser, userController.getMyProjects)
router.put("/completeProfile", isAuthenticatedUser, upload.single('profileImage'), userController.completeProfile)
router.get("/employees", isAuthenticatedUser, userController.getEmployees)
router.get("/managers", isAuthenticatedUser, userController.getAllManagers)
router.route("/leave").post(isAuthenticatedUser, userController.addLeave).get(isAuthenticatedUser, userController.getMyLeaves)
router.put("/leave/:id", isAuthenticatedUser, commonController.updateLeave);
router.get("/employeeLeaves", isAuthenticatedUser, userController.getEmployeeLeaves);
module.exports = router