const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const userRouter = require('./routes/userRouter');
const razorpayRouter = require('./routes/razorpayRouter');
const companyRouter = require('./routes/companyRouter');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utilities/appError');
const MetalRates = require('./models/metalsModel');
const path = require('path');
var cron = require('node-cron');
const axios = require('axios');

const app = express();
app.use(cors({origin:'*'}));
app.use(express.static(`${__dirname}/assets`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(helmet());
app.use(compression());


 app.use((req,res,next)=>{
    req.date =new Date().toISOString();    
    next();
});

 app.use('/api/v1/users',userRouter);
 app.use('/api/v1/razorpay',razorpayRouter);
 app.use('/api/v1/company' , companyRouter);

 app.get('/',(req, res)=>{
   res.status(200).json({
       status:'success',
       data:{
           message:'Your Server Running Perfectly !'
       }
   })
 });

 // Here Getting Metal rates from Api and saving it to MongoDB every 2 Hour=================
//  cron.schedule('0 0 */2 * * *', async () => {

//     // calling metals api to get gold silver rates
//     await axios.get('https://metals-api.com/api/latest?access_key=mnql3z29gi337si5p54lsn8oejt4hedz4m3e7yhak1kdqi563hvh2pb918pp&base=INR&symbols=XAU,XAG')
//     .then(response => {
//         // Saving rates and metalid to update
//         let rates = response.data.rates;
//         var gold = rates.XAU;
//         var silver = rates.XAG;
//         var metalid = '5f5e0a9f85d36139e65c53fe';
//         // Ends here 

//         //==================================================
//         //calculating additional charges and getting final gold to insert
//         var goldRate1 = Math.ceil((gold * 10)/31.103); // RATE OF GOLD IN INR (10 GRAMS)
//         var goldRate2 = Math.ceil(goldRate1 + (goldRate1 * 0.14)); // RATE WITH 14% CUSTOM DUTY
//         var goldRatetwentyFourCarret = Math.ceil(goldRate2 + (goldRate2 * 0.03)); // RATE WITH 3% PREMIUM
//         // ends here

//         //calculating additional charges and getting final silver rate to insert
//         var silverRate1 = Math.ceil((silver * 1000)/31.103); //RATE OF SILVER WITH INR (1000 GRAMS)
//         var silverRate2 = Math.ceil(silverRate1 + (silverRate1 * 0.14)); //RATE WITH 14% CUSTOM DUTY
//         var silverRateFinal = Math.ceil(silverRate2 + (silverRate2 * 0.03)); // RATE WITH 3% PREMIUM
//         // ends here
//         //==================================================

//         // Creating Rate body to send
//         var rateBody = {
//             gold : goldRatetwentyFourCarret,
//             silver : silverRateFinal
//         };
//         // Ends here

//         // Saving rates to MongoDB by Id
//         const Apirates = MetalRates.findByIdAndUpdate(metalid,rateBody,{new:true});
//         if(!Apirates) return next(new AppError('Metal rates are not found ! ',400));
//         console.log('Automatic rates update success' , rateBody);
//         // Saving Ends here
//     })
//     .catch(error => {
//       console.log(error);
//     });
    
//   });// Ends here ========================================================================================


 app.get('/newlyadded',(req, res)=>{
    res.status(200).json({
        status:'success',
        data:{
            message:'Your Server Running Perfectly !'
        }
    })
  });
// ROUTES ERROR HANDLER
app.all('*',(req,res,next)=>{
   
    next(new AppError(`can't find ${req.originalUrl} on this server`,404));
});
app.use(globalErrorHandler);
module.exports = app;
