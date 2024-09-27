const mongoose = require("mongoose");
const dbName = "examAPI";
const createInitialAdmin = require('./Controllers/CreateInitialadmin');


const connectdb = ()=>{
    // mongodb://localhost:27017/NewDB
    // mongodb://127.0.0.1:27017/NewDB
    //Atlas server : 
mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`)
    .then( async () => {
        console.log("Mongodb connected.");
        await createInitialAdmin();
    })
    .catch((err)=> console.log("Mongodb connection error: ",err));

};

module.exports= { connectdb };