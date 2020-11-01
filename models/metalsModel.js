const mongoose = require('mongoose');


const metalsSchema = new mongoose.Schema({
    gold:{
        type:Number,
        required:[true,'Gold rate must be required']
    },
    silver:{
        type:Number,
        required:[true,'Silver rate must be required']
    },
    diamond:{
        type:Number,
        required:[true,'Diamond rate must be required']
    },
    diamondvvsVS:{
        type:Number
    },
     diamondvsSI:{
        type:Number
    },
    diamondSI:{
        type:Number
    }
});


const MetalRates = mongoose.model('MetalRates', metalsSchema);
module.exports = MetalRates;