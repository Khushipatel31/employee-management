const mongoose = require("mongoose");
const userProjectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
    },
    project: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "projects",
    },
    reportingTo: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
    },
    techStack: [{ tech: String }],
    joinDate: Date,
    leaveDate: Date,
    is_active: { type: Number, default: 1 },
    is_approved: { default: 0, type: Number, enum: [0, 1, 2] },//0 -pending 1 -approved 2 -rejected
  },

  { timestamps: true }
);
const userProjectModel = mongoose.model("userProjects", userProjectSchema);
module.exports = userProjectModel;