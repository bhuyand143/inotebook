const mongoose=require('mongoose');
const contactSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    feedback:{
        type:String,
        default:'No feedback'
    }
});

module.exports=mongoose.model('contact',contactSchema);