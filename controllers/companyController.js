//AUTHOR: PAWAN DARJI
//CREATEDON: 12-10-2020
//LAST MODIFIED: 17-10-2020
//NAME: COMPANY CONTROLLER

const catchError = require('../utilities/catchError');
const AppError = require('../utilities/appError');
const Company = require('../models/companyModal');



exports.getCompanyById = catchError(async(req , res , next) => {
    const id = req.params.id;
    const company = await Company.findById(id,{__v:0});
    if(!company) {
        return next(new AppError('No company found with this Id' , 404));
    }
    res.status(200).json({
        status: 'success',
        company
    });
});

exports.getAllCompany = catchError(async(req , res, next) => {
    const companies = await Company.find();
    if(!companies) {
        return next(new AppError('Error while getting companies' , 404)); 
    }
    res.status(200).json({
        status: 'success',
        companies
    });
})


exports.createCompany = catchError(async(req , res , next) => {
    const d = new Date().toISOString();
    const company = Company.create({
        name: req.body.name,
        ownername: req.body.ownername,
        contactnumber: req.body.contactnumber,
        email: req.body.email,
        companyaddress: req.body.companyaddress,
        date: d
    });
    if(!company) {
        return next(new AppError('Error while creating Company! , please try again' , 404));
    }
    res.status(200).json({
        status: 'Success',
        company
    });
})