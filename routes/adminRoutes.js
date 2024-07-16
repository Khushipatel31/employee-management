const express = require("express");
const adminController = require("../controllers/adminController.js");
const {
    isAuthenticatedUser,
    verify,
    authorizeRoles,
} = require("../middleware/auth.js");
const router = express.Router();

// router.get("/verify", verify);
router
    .route("/designation")
    .post(
        isAuthenticatedUser, authorizeRoles("admin"),
        adminController.addDesignation
    )
    .get( isAuthenticatedUser, authorizeRoles("admin"),adminController.getDesignations);

module.exports = router;
