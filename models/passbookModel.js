const mongoose = require('mongoose');


const passbookSchema = new mongoose.Schema({
    email:{
        type:String
    },
    amount:{
        type:Number
    },
    date:{
        type:Date
    },
    payment_id:{
        type:String
    },
    user_id:{type:String},
    goldrate:Number,
    planNo:{
        type:Number
    },
    gold:Number
});


const Passbook = mongoose.model('Passbook',passbookSchema);
module.exports = Passbook;