const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema(
	{
		name: String,
		description: String,
		startDate: Date,
		endDate: Date,
		duration: { type: Number, default: -1 },
		is_active: { type: Number, default: 1 },
	},
	{ timestamps: true }
);

projectSchema.statics.getEndDate = async function (startDate, duration) {
	let endDate = new Date(startDate);
	endDate.setMonth(endDate.getMonth() + Number(duration));
	return endDate
};

const projectModel = mongoose.model('projects', projectSchema);
module.exports = projectModel;
