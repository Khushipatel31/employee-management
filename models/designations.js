const mongoose = require('mongoose');
const designationSchema = new mongoose.Schema(
	{
		name: String,
		is_manager: { type: Boolean, default: false },
		is_active: { type: Number, default: 1 },
	},
	{ timestamps: true }
);
const designationModel = mongoose.model('designations', designationSchema);
module.exports = designationModel;