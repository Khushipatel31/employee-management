const mongoose = require("mongoose");
const userProjectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
    },
    project:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "projects",
    },
  },
  { timestamps: true }
);
const userProjectModel = mongoose.model("userProjects", userProjectSchema);
module.exports = userProjectModel;