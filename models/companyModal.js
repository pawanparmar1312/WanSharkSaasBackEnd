const mongoose = require('mongoose');


const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true , 'Please enter Compaany name']
    },
    ownername: {
        type: String,
        required: [true , 'Please enter company owner name']
    },
    contactnumber: {
        type:Number,
        required: [true , 'Please enter company contact number']
    },
    email : {
        type: String,
        required: [true , 'Please enter company register email']
    },
    companyaddress : {
        type: String,
        required : [true , 'please enter company address']
    },
    // companylogo : {
    //     type : String
    // },
    date:{
        type:Date
    }
});

const Company = mongoose.model('company' , companySchema);
module.exports = Company;