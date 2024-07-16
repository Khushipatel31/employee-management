const express = require("express");
const adminController = require("../controllers/adminController.js");
const {
  isAuthenticatedUser,
  verify,
  authorizeRoles,
} = require("../middleware/auth.js");
const router = express.Router();

router.get("/verify", isAuthenticatedUser, verify);

router
  .route("/designation")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.addDesignation
  )
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.getDesignations
  );

router
  .route("/employee")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.addEmployee
  )
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.updateEmployee
  )
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.deleteEmployee
  )
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.getAllEmployee
  );

router
  .route("/project")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.addProject
  )
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.editProject
  )
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.editProject
  );

module.exports = router;
