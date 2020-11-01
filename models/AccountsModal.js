const mongoose = require('mongoose');


const accountsSchema = new mongoose.Schema({
    amount: {
        type: Number
    },
    transactype: {
        type: String
    },
    reason: {
        type:String
    },
    product: {
        type: String
    },
    method: {
        type:String
    },
    user_id: {
        type:String
    },
    createdon:{
        type:Date
    }
});


const Accounts = mongoose.model('Accounts' , accountsSchema);
module.exports = Accounts;