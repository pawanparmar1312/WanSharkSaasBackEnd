const express = require('express');
const companyController = require('../controllers/companyController');
const storeController = require('../controllers/storeController');;
const router = express.Router();


router.get('/GetCompanybyId/:id' , companyController.getCompanyById);
router.post('/createCompany' , companyController.createCompany);
router.get('/getAllCompanies' , companyController.getAllCompany);
router.post('/createMetalsElements' , storeController.uploadMetalsIcon 
                                    , storeController.resizesImageMetals 
                                    , storeController.createMetalsandElements);
router.get('/getMetalsCompanyWise/:id' , storeController.getAllMetalsByCompanyId);
router.post('/createCategories' , storeController.uploadCategoryIcon
                                , storeController.resizesImageCategory
                                , storeController.createCategories);
router.get('/getAllCategoriesByMetalsId/:id' , storeController.getAllCategoriesByMetalsId);
router.post('/createProduct' , storeController.uploadProductIcon 
                             , storeController.resizesImageProduct 
                             , storeController.createProduct);
router.get('/getProductsByCategoryId/:id' , storeController.getAllProductsByCategoryId);
module.exports = router;