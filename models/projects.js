const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema(
	{
		name: String,
        description:String,
        startDate:String,
        duration:{type:Number,default:-1},
		is_active: { type: Number, default: 1 },
	},
	{ timestamps: true }
);
const projectModel = mongoose.model('projects', projectSchema);
module.exports = projectModel;
