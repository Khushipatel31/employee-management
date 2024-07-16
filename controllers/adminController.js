const userModel=require('../models/users')
const { CustomHttpError } = require("../utils/customError");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const mongoose=require("mongoose");
const designationModel=require('../models/designations');
const addDesignation=catchAsyncErrors(async(req,res,next)=>{
    const{name}=req.body;
    if(!name){
        return next(new CustomHttpError(400,"Please write designation"))
    }
    const designation = new designationModel({name});
    await designation.save();
    res.status(200).json({
        success:true
    })
})

const getDesignations=catchAsyncErrors(async(req,res,next)=>{
   
    const designations = await designationModel.find({});

    res.status(200).json({
        success:true,
        data:designations
    })
})

module.exports={
    addDesignation,
    getDesignations
}