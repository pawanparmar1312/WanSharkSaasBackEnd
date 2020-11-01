//AUTHOR: PAWAN DARJI
//CREATEDON: 1-8-2020
//LAST MODIFIED: 12-10-2020
//NAME: RAZORPAY CONTROLLER


const Razorpay = require('razorpay');
const catchError = require('../utilities/catchError');
const shortid = require('shortid');
const Passbook = require('../models/passbookModel');
const AppError = require('../utilities/appError');

const instance = new Razorpay({
    key_id: 'rzp_test_BSjuo0zrfmh2me',
    key_secret: 'I23HA5U8UKZ5myYoJa8amsyq'
  });

  exports.checkoutSession = catchError(async(req,res,next)=>{
     
    const data =await instance.orders.create({
        amount:req.body.amount*100,
        currency:"INR",
        receipt:shortid.generate(),
        payment_capture:1
    });

       return res.status(200).json({
            status:'sucess',
            data:{
                id:data.id,
                amount:data.amount,
                currency:data.currency,
                receipt:data.receipt,
                date:data.created_at
            }
        });
  });

  
  exports.paymentInfo = catchError(async(req,res,next)=>{
    const d = new Date().toISOString();
    const payment =  await Passbook.create
    ({
      email:req.body.email,
      amount:req.body.amount,
      payment_id:req.body.payment_id,
      user_id:req.body.user_id,
      date:d,
      goldrate:req.body.goldrate,
      planNo:req.body.planNo,
      gold:req.body.gold
    });

    if(!payment){
        return next(AppError('payment receipt is not captured!',400));
    }
      res.status(200).json({
          status:'success',
          payment
      });
  });


  exports.paymentDetails = catchError(async(req,res,next)=>{
    const user_id = req.params.id;
    const payments =  await Passbook.find({user_id}).sort('date');
    return res.status(200).json({
      status:'success',
      payments
    });
  });
  
  exports.paymentDetails1 = catchError(async(req,res,next)=>{
    const user_id = req.params.id;
    const planNo = req.params.planNo;
    const payments =  await Passbook.find({user_id,planNo}).sort('date');
    return res.status(200).json({
      status:'success',
      payments
    });
  });