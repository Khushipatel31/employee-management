const express = require("express");
const adminController = require("../controllers/adminController.js");
const commonController = require("../controllers/commonController.js");
const {
  isAuthenticatedUser,
  verify,
  authorizeRoles,
} = require("../middleware/auth.js");
const router = express.Router();

router.get("/verify", isAuthenticatedUser, authorizeRoles("admin"), verify);

router.get(
  "/counts",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  adminController.getCounts
);

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
  )
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.updateDesignation
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

  .get(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.getAllEmployee
  );

router.delete(
  "/employee/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  adminController.deleteEmployee
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
    adminController.getAllProjects
  );


router
  .route("/project/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), adminController.getProject)
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.deleteProject
  );

router.get("/projectJoinRequests", isAuthenticatedUser, authorizeRoles("admin"), adminController.getProjectJoinRequests)
router.put("/projectJoinRequest/:id", isAuthenticatedUser, authorizeRoles("admin"), adminController.updateProjectRequest);
router.put("/leave/:id", isAuthenticatedUser, authorizeRoles("admin"), commonController.updateLeave);
router.get("/leave", isAuthenticatedUser, authorizeRoles("admin"), adminController.getAllLeave);
module.exports = router;
