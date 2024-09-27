const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Userschema = new Schema ({
    firstName: { type: String , required: true },
    lastName: { type: String , required: true },
    email: { type: String, required: true ,unique: true },
    image: { type: String , required: true },
    password: { type: String, required: true ,unique: true },
    repassword: { type: String, required: true },
    role: { type: String , enum : ['student' , 'admin'], default: "student" },
});

const User = mongoose.model("User", Userschema);

module.exports =  User ;