const express=require("express");
const router=express.Router();
const userController=require("../controllers/userController")
const{verify,isAuthenticatedUser,authorizeRoles}=require('../middleware/auth');

router.get("/verify",isAuthenticatedUser,verify);

router.get("/projects",isAuthenticatedUser,userController.getProjects)

// router.route("/profile").post(isAuthenticatedUser);

router.post("/assignProject",isAuthenticatedUser,userController.assignProject)
router.get("/myProjects",isAuthenticatedUser,userController.getMyProjects)

module.exports=router