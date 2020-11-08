//AUTHOR: PAWAN DARJI
//CREATEDON: 1-10-2020
//LAST MODIFIED: 16-10-2020
//NAME: STORE CONTROLLER


const Metals = require('../models/metalsAndElementsModal');
const Category = require('../models/categoryModal');
const Product = require('../models/productsModal');
const AppError = require('../utilities/appError');
const catchError = require('../utilities/catchError');
const multer  = require('multer');
const sharp = require('sharp');

// MULTER STORAGE
const multerStorage = multer.memoryStorage();

// SETTING UP FILEFILTER
const fileFilter = (req,file,cb)=>{
  if(file.mimetype.startsWith('image')){
      cb(null,true)
  }
  else{
      cb(new AppError('This is not an image file!',400),false);
  }
}

// SETTING UP MULTER FILE UPLOAD
const upload = multer({ storage:multerStorage,fileFilter:fileFilter});


//==========================METALS SECTION================================================================

// UPLOADING IMG
exports.uploadMetalsIcon = upload.fields([{ name: 'metalsIcon', maxCount: 1 }]);

// RESIZING IMAGE ACCORDINGLY AND UPLOADING TO DIRECTORY
exports.resizesImageMetals =  catchError(async(req,res,next)=>{

    // CHECKING IF REQ BODY CONTAINS FILE OR NOT
    if(!req.files) {
        return next(new AppError('File not found',400)); 
    }

   //GETTING FILE NAME FROM REQ
   const name = req.files.metalsIcon[0].originalname.toLowerCase().split(' ').join('-');
   
   //UPLOADING FILE
   req.files.metalsIcon[0].originalname = `metalsIcon-${Date.now()}-${name}`;
   await sharp(req.files.metalsIcon[0].buffer)
         .resize(800,1000)
         .toFormat('jpeg')
         .jpeg({quality:90})
         .toFile(`assets/metalsIcon/${req.files.metalsIcon[0].originalname}`);
         next();
});

// INSERTING INTO DB
exports.createMetalsandElements = catchError(async(req , res , next) => {
    const url =  req.protocol + '://' + req.get('host') ;
    const d = new Date().toISOString();
    const MetalsCreated = await Metals.create({
        name: req.body.name,
        date: d,
        metalsIcon: url+'/metalsIcon/'+req.files.metalsIcon[0].originalname,
        companyId: req.body.companyid,
        userid: req.body.userid
    });

    res.status(201).json({
        status:'success',
        data: MetalsCreated
    });
})

//GETTING ALL METALS BY COMPANY ID
exports.getAllMetalsByCompanyId = catchError(async(req , res , next) => {
    const companyId = req.params.id;
    const metals = await Metals.find({companyId}).sort('date');
    return res.status(200).json({
        status: 'Success',
        metals
    });
});
//===========================ENDS HERE==================================================================

//===============================CATEGORY SECTION===================================================

// UPLOADING IMG
exports.uploadCategoryIcon = upload.fields([{ name: 'categoryIcon', maxCount: 1 }]);

// RESIZING IMAGE ACCORDINGLY AND UPLOADING TO DIRECTORY
exports.resizesImageCategory =  catchError(async(req,res,next)=>{

    // CHECKING IF REQ BODY CONTAINS FILE OR NOT
    if(!req.files) {
        return next(new AppError('File not found',400)); 
    }

   //GETTING FILE NAME FROM REQ
   const name = req.files.categoryIcon[0].originalname.toLowerCase().split(' ').join('-');
   
   //UPLOADING FILE
   req.files.categoryIcon[0].originalname = `categoryIcon-${Date.now()}-${name}`;
   await sharp(req.files.categoryIcon[0].buffer)
         .resize(800,1000)
         .toFormat('jpeg')
         .jpeg({quality:90})
         .toFile(`assets/categoryIcon/${req.files.categoryIcon[0].originalname}`);
         next();
});

// INSERTING INTO DB
exports.createCategories = catchError(async(req , res , next) => {
    const url =  req.protocol + '://' + req.get('host') ;
    const d = new Date().toISOString();
    const CategoriesCreated = await Category.create({
        name: req.body.name,
        date: d,
        categoryIcon: url+'/categoryIcon/'+req.files.categoryIcon[0].originalname,
        metalsAndElementId: req.body.metalsAndElementId,
        companyId: req.body.companyId,
        userid: req.body.userid
    });

    res.status(201).json({
        status:'success',
        data: CategoriesCreated
    });
});

//GETTING ALL CATEGORIES BY METALS ID
exports.getAllCategoriesByMetalsId = catchError(async(req , res , next) => {
    const metalsAndElementId = req.params.id;
    const categories = await Category.find({metalsAndElementId}).sort('date');
    return res.status(200).json({
        status: 'Success',
        categories
    });
});

//===========================ENDS HERE==============================================================

//==========================PRODUCT SECTION=========================================================

exports.uploadProductIcon = upload.fields([{ name: 'productIcon', maxCount: 1 }]);


// RESIZING IMAGE ACCORDINGLY AND UPLOADING TO DIRECTORY
exports.resizesImageProduct =  catchError(async(req,res,next)=>{

    // CHECKING IF REQ BODY CONTAINS FILE OR NOT
    if(!req.files) {
        return next(new AppError('File not found',400)); 
    }

   //GETTING FILE NAME FROM REQ
   const name = req.files.productIcon[0].originalname.toLowerCase().split(' ').join('-');
   
   //UPLOADING FILE
   req.files.productIcon[0].originalname = `productIcon-${Date.now()}-${name}`;
   await sharp(req.files.productIcon[0].buffer)
         .resize(800,1000)
         .toFormat('jpeg')
         .jpeg({quality:90})
         .toFile(`assets/productIcon/${req.files.productIcon[0].originalname}`);
         next();
});

// INSERTING INTO DB
exports.createProduct = catchError(async(req , res , next) => {
    const url =  req.protocol + '://' + req.get('host') ;
    const d = new Date().toISOString();
    const ProductCreated = await Product.create({
        name: req.body.name,
        date: d,
        productIcon: url+'/productIcon/'+req.files.productIcon[0].originalname,
        productimg:null,
        productimg1:null,
        productimg2:null,
        productimg3:null,
        metalsAndElementId: req.body.metalsAndElementId,
        categoryId:req.body.categoryId,
        price:req.body.price,
        description:req.body.description,
        companyId: req.body.companyId,
        userid: req.body.userid,
        Carat:req.body.Carat,
        gram:req.body.gram
    });

    // SENDING SUCCESS RESPONSE
    res.status(201).json({
        status:'success',
        data: ProductCreated
    });

});

//GETTING ALL PRODUCTS BY CATEGORY ID
exports.getAllProductsByCategoryId = catchError(async(req , res , next) => {
    const categoryId = req.params.id;
    const products = await Product.find({categoryId}).sort('date');
    return res.status(200).json({
        status: 'Success',
        products
    });
});

//GETTING PRODUCT INFO BY PRODUCT ID
exports.getProductById = catchError(async (req , res , next) => {
    const id = req.params.id;
    const product = await Product.findById(id,{__v:0});
    return res.status(200).json({
        status: 'Success',
        product
    });
});



//==========================ENDS HERE===============================================================