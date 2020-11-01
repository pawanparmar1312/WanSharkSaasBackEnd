const mongoose = require('mongoose');


const metalsAndElementsSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true , 'Name is required']
    },
    date:{
        type:Date,
        required:[true,'Date not found']
    },
    metalsIcon: {
        type: String,
        required: [true , 'Please select Icon']
    },
    companyId : {
        type: String,
        required:[true , 'companyid not found']
    },
    userid: {
        type: String,
        required:[true , 'userid not found']
    }
});


const MetalsAndElements = mongoose.model('MetalsAndElements' , metalsAndElementsSchema);
module.exports = MetalsAndElements;