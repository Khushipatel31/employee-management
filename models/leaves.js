const mongoose = require("mongoose");
const leaveSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "users",
        },
        leaveType: 'String',
        from: Date,
        to: Date,
        reason: String,
        managers: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "users",
        }],
        is_approved: { default: 0, type: Number, enum: [0, 1, 2] },//0 -pending 1 -approved 2 -rejected
        approved_by: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "users",
        },
        is_active: { type: Number, default: 1 },
    },
    { timestamps: true }
);
const leaveModel = mongoose.model("leaves", leaveSchema);
module.exports = leaveModel;