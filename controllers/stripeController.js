const stripe = require('stripe')('sk_test_51GklmeDFOWNVi1aW0Gk0BGk1iOtQBT3jy8w9OWbImfh3mwnfvi9i1H4RGaWaQ22ZMCvl2SJiVcTTPkRGgvm5OkVh00y5k7DLBD');
const mongoose =require('mongoose');
const Passbook = require('../models/passbookModel');
const catchError = require('../utilities/catchError');
const AppError = require('../utilities/appError');


exports.getCheckoutSession = catchError(async(req,res,next)=> {
  const token = req.body;
  const paymentObj = await stripe.paymentIntents.create({
    amount: token.amount,
    currency: token.currency,
    payment_method_types: ['card'],
    receipt_email:token.owner.email,
    description:token.owner.email
  });
  
     return  res.status(200).json({
          status:'success',
          paymentObj
      });
  


});

exports.paymentInfo = catchError(async(req,res,next)=>{

  const paymentInfo =  await Passbook.create(
    {
      email:req.body.email,
      amount:req.body.amount,
      date:req.date,
      user:req.body.user
    });
  return res.status(200).json({
    status:'success',
    paymentInfo
  });
});

exports.paymentDetails = catchError(async(req,res,next)=>{
  const user = req.params.user;
  const payments =  await Passbook.find({user});
  return res.status(200).json({
    status:'success',
    payments
  });
});

exports.getpayments = catchError(async(req,res,next)=>{
  const payments =  await Passbook.find();
  return res.status(200).json({
    status:'success',
    payments
  });
});