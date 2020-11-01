const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');


const router = express.Router();

router.post('/signup',userController.uploadProfile,userController.resizesImage,authController.signUp);
router.post('/login',authController.login);
router.post('/forgotpassword',authController.forgotPasswrod);
router.post('/welcomeUserMail' , userController.sendWelcomeMail);
router.post('/paymentMail' , userController.sendPaymentMail);
router.post('/onCompleteSendMail' , userController.sendOnCompleteMail);
router.patch('/resetpassword/:token',authController.resetPassword);
router.patch('/updatepassword',authController.protect,authController.updatePassword);
router.get('/getUserCompanyWise/:id', authController.protect,userController.getUsers);
router.get('/rates',authController.protect, userController.getMetalRates);
router.post('/createtransaction' , userController.CreateTransaction);
router.get('/getTransactions/:id' , userController.GetTransactions);
router.get('/getCompanyById/:id' , userController.getCompanyById);
router.post('/CreateMetals' , userController.uploadMetalsIcon , userController.resizesMetalsIcon , userController.SaveMetalsDetails);
router.route('/:id')
   .get(authController.protect ,userController.getUser)
   .patch(
      authController.protect,
      userController.uploadProfile,
      userController.resizesImage,
      userController.updateUser
      )
   .delete(authController.protect,userController.deleteUser);
 router.patch(
      '/rates/:id',
      authController.protect,
      userController.updateMetalRates
      );
      router.patch('/newplan/:id',userController.updateNewPlan);
module.exports = router;