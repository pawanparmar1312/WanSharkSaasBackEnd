const mongoose = require('mongoose');
const dotenv = require('dotenv');


// Catching Uncaught Exception Error
process.on('unCaughtException', err => {
    console.log('Caught Exception');
    console.log(err.name, err.message);
    process.exit(1);
})
const app = require('./app');
dotenv.config({path:'./config.env'});
const db = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);
mongoose.connect(db,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true 
}).then(()=>{
    console.log('connected to server!');
});

const port = process.env.PORT ||3000;

const server = app.listen(port);

// Error handler for bad request
process.on('unhandledRejection', err => {
    console.log('Unhandled Rejection ! Shutting down.........');
    console.log( err.message);
    server.close( () => {
        process.exit(1);
    });
});