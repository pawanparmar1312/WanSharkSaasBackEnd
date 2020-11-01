
//AUTHOR: PAWAN DARJI
//CREATEDON: 1-8-2020
//LAST MODIFIED: 12-10-2020
//NAME: USER CONTROLLER


const User = require('../models/userModel');
const multer  = require('multer');
const sharp = require('sharp');
const AppError = require('../utilities/appError');
const catchError = require('../utilities/catchError');
const path = require('path');
const MetalRates = require('../models/metalsModel');
const { find } = require('../models/userModel');
const WelcomeMail = require('../utilities/welcomemail');
const PaymentMail = require('../utilities/paymentmail');
const onCOmpleteMail = require('../utilities/oncompletemail');
const Accounts = require('../models/AccountsModal');
const MetalsAndElements = require('../models/metalsAndElementsModal');
const Company  = require('../models/companyModal');

// for Image upload
const multerStorage = multer.memoryStorage();
const fileFilter = (req,file,cb)=>{
  if(file.mimetype.startsWith('image')){
      cb(null,true)
  }else{
      cb(new AppError('This is not an image file!',400),false);
  }
}
 
const upload = multer({ storage:multerStorage,fileFilter:fileFilter});


exports.uploadProfile = upload.fields([{ name: 'panCard', maxCount: 1 }, { name: 'adhaar', maxCount: 1}]);

// Image Resize
exports.resizesImage =  catchError(async(req,res,next)=>{
    const fields = Object.keys(req.files);
    if(!req.files) return next();
    if(fields[1]==='adhaar'|| fields[0] !== 'panCard'){


    // For adhaar card 
    const adhaar = req.files.adhaar[0].originalname.toLowerCase().split(' ').join('-');
    req.files.adhaar[0].adhaar = `adhaar-${Date.now()}-${adhaar}`;
    await sharp(req.files.adhaar[0].buffer)
          .rotate()
          .resize(800,1000)
          .toFormat('jpeg')
          .jpeg({quality:90})
          .toFile(`assets/adhaar/${req.files.adhaar[0].adhaar}`);
    }
         

   // For PAN card
   if(fields[0]!=='adhaar'|| fields[0] === 'panCard'){
   const name = req.files.panCard[0].originalname.toLowerCase().split(' ').join('-');
   req.files.panCard[0].panCard = `panCard-${Date.now()}-${name}`;
   await sharp(req.files.panCard[0].buffer)
         .resize(800,1000)
         .toFormat('jpeg')
         .jpeg({quality:90})
         .toFile(`assets/panCard/${req.files.panCard[0].panCard}`);
   }
         next();
});

//FOR METALS SCHEMA INSERT AND IMAGE UPLOAD==========================================================

//upload file
exports.uploadMetalsIcon = upload.fields([{name: 'metalsIcon' , maxCount: 1}]);

//resizing file
exports.resizesMetalsIcon = catchError(async(req , res , next) => {
    const fields = Object.keys(req.files);
    if(!req.files) return next();
    
    const metalsIcon = req.files.metalsIcon[0].originalname.toLowerCase().split(' ').join('-');
    req.files.metalsIcon[0].metalsIcon = `metalsIcon-${Date.now()}=${metalsIcon}`;

    await sharp(req.files.metalsIcon[0].buffer)
          .rotate()
          .resize(800,1000)
          .toFormat('jpeg')
          .jpeg({quality:90})
          .toFile(`assets/MetalsIcon/${req.files.metalsIcon[0].metalsIcon}`);
});

//inserting into DB
exports.SaveMetalsDetails = catchError(async(req , res , next) => {
    const  url = req.protocol + '://' + req.get('host');

    const MetalsDetailsCreated = await MetalsAndElements.create({
        name: req.body.metalName,
        date: Date.now().toISOString(),
        metalsIcon: url + '/MetalsIcons/' + req.files.metalsIcon[0].metalsIcon
    });

    if(!MetalsDetailsCreated) return next(new AppError('Erro occured while inserting details. Try again later',500));

    res.status(200).json({
        MetalsDetailsCreated
    });

})

//METALS REGION ENDS HERE

exports.getUsers = catchError(
    async(req,res,next)=>{
        const companyId = req.params.id;
        const users = await User.find({companyId});
        if(!users){
            return next(new AppError('Users Not Found',404));
        }
        res.status(200).json({
            status:'success',
            users:users
        });
    
   });


exports.sendWelcomeMail = catchError(async (req , res,  next)=> {
    try{
        await WelcomeMail(req.body);
        res.status(200).json({
            status:'success',
            message:'Welcome Mail sended!'
        });
      }
      catch(err){
          return next(new AppError('there was an error sending the email. Try again later',500));
      }
});

exports.sendPaymentMail = catchError(async (req , res,  next)=> {
    try{
        await PaymentMail(req.body);
        res.status(200).json({
            status:'success',
            message:'Payment Mail sended!'
        });
      }
      catch(err){
          return next(new AppError('there was an error sending the email. Try again later',500));
      }
});

exports.sendOnCompleteMail = catchError(async (req , res,  next)=> {
    try{
        await onCOmpleteMail(req.body);
        res.status(200).json({
            status:'success',
            message:'on complete Mail sended!'
        });
      }
      catch(err){
          return next(new AppError('there was an error sending the email. Try again later',500));
      }
});

exports.getUser = catchError(async(req,res,next)=>{
    const id = req.params.id;
    const user = await User.findById(id,{__v:0});
    if(!user){
        return next(new AppError('No User is found with this ID', 404));
    }
    res.status(200).json({
        status:'success',
        user:user
    });
});

const filterFieldsForUpdate = (obj,...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach(el => {
      if(allowedFields.includes(el)) newObj[el] = obj[el];
  });
  
  return newObj;
   
}


exports.updateUser = catchError(async(req,res,next)=>{
   
    const url =  req.protocol + '://' + req.get('host') ;
    const filteredObj = await filterFieldsForUpdate(req.body,'name','email','mobile','address','panCard','adhaar','plans');
   
   if(req.files){       
    if(req.body.panCard === undefined) filteredObj.panCard = url+'/panCard/'+req.files.panCard[0].panCard;
    if(req.body.adhaar === undefined) filteredObj.adhaar = url+'/adhaar/'+req.files.adhaar[0].adhaar;
   }
   const updatedUser = await User.findByIdAndUpdate(req.params.id,filteredObj,{new:true,runValidators:true});
    if(!updatedUser) return next(new AppError('User not updated ',400));   
     res.status(201).json({
        status:'success',
        user: updatedUser
    });  
});


exports.getMetalRates =catchError(async(req,res,next)=>{
    const rates = await MetalRates.find();
    if(!rates) return next(new AppError('Metal rates are not found ! ',400)); 
        res.status(200).json({
            status:'success',
            rates
        });
    });


// exports.getandUpdateRatesFromApiToDatabase = catchError(async(req , res , next)=> {
//     console.log('calling');
// });

    exports.updateMetalRates =catchError(async(req,res,next)=>{
        if(req.body.diamond === null) delete req.body.diamond;
        if(req.body.diamondvvsVS === null) delete req.body.diamondvvsVS;
        if(req.body.diamondvsSI === null) delete req.body.diamondvsSI;
        if(req.body.diamondSI === null) delete req.body.diamondSI;
        const rates = await MetalRates.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!rates) return next(new AppError('Metal rates are not found ! ',400)); 
            res.status(200).json({
                status:'success',
                rates
            });
        });

    exports.deleteUser = catchError(async(req,res,next)=>{
        const user= await User.findByIdAndDelete(req.params.id);
        if(!user){
            return next(new AppError('No user is found with this ID', 404));
        }
        res.json({
            status:'success',
            message:'User successfully deleted !'
        });
    });

    
    exports.updateNewPlan = catchError(async(req,res,next)=>{
        const plan = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        if(!plan) return next(new AppError('User not updated ',400));
         res.status(201).json({
            status:'success',
            user: plan
        });
    });

    exports.CreateTransaction = catchError(async(req , res ,next)=> {
        const d = new Date().toISOString();
        const transaction = await Accounts.create({
            amount: req.body.amount,
            transactype: req.body.transactype,
            reason: req.body.reason,
            product: req.body.product,
            method: req.body.method,
            user_id: req.body.user_id,
            createdon: d
        });

        if(!transaction) {
            return next(AppError('Transaction could not captured' , 400));
        }

        res.status(200).json({
            status: 'success',
            transaction
        });
    });

    exports.GetTransactions = catchError(async(req , res , next) => {
        const user_id = req.params.id;
        const Transactions = await Accounts.find({user_id}).sort('date');

        if(!Transactions) {
            return next(AppError('Transaction could not captured' , 400));
        }

        return res.status(200).json({
            Transactions
        });
    });

    exports.getCompanyById = catchError(async(req , res,  next) => {
        const company_Id = req.params.id;
        const Company = await Company.find({company_Id});

        if(!Company) {
            return next(AppError('Cannot find Comany' , 400));
        }

        return res.status(200).json({
            Company
        });
    });