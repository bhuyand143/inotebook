const { default: userEvent } = require('@testing-library/user-event');
const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});
const User=mongoose.model('User',UserSchema);
// User.createIndexes(); it helps in creating indexes that will make the content unique
module.exports=User;