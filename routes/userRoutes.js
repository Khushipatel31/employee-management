const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")
const { verify, isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const upload = require("../utils/multerConfig")
router.get("/verify", isAuthenticatedUser, verify);

router.get("/projects", isAuthenticatedUser, userController.getProjects)
router.post("/assignProject", isAuthenticatedUser, userController.assignProject)
router.get("/getProjects/:empId", isAuthenticatedUser, userController.getMyProjects)
router.put("/completeProfile", isAuthenticatedUser, upload.single('profileImage'), userController.completeProfile)

module.exports = router