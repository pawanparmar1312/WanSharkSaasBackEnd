const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true , 'Name is required']
    },
    date:{
        type:Date,
        required:[true,'Date not found']
    },
    productIcon: {
        type: String,
        required: [true , 'Please select Icon']
    },
    productimg: {
        type: String
    },
    productimg1: {
        type:String
    },
    productimg2: {
        type:String
    },
    productimg3: {
        type: String
    },
    metalsAndElementId: {
        type:String
    },
    categoryId: {
        type:String
    },
    price: {
        type:Number,
        required:[true , 'Product price required']
    },
    description: {
        type:String,
        required: [true , 'Product description required']
    },
    companyId : {
        type: String
    },
    userid: {
        type: String
    },
    Carat: {
        type: String
    },
    gram:{
        type:String
    }
});


const Products = mongoose.model('Products' , productSchema);
module.exports = Products;