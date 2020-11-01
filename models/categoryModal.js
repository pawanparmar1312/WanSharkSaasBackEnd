const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true , 'Name is required']
    },
    date:{
        type:Date,
        required:[true,'Date not found']
    },
    categoryIcon: {
        type: String,
        required: [true , 'Please select Icon']
    },
    metalsAndElementId: {
        type:String
    },
    companyId : {
        type: String
    },
    userid: {
        type: String
    }
});


const Categories = mongoose.model('Categories' , categorySchema);
module.exports = Categories;