const mongoose=require('mongoose');

require('dotenv').config();


const mongoURI=process.env.MONGO_URL


mongoose.set('strictQuery', true);
const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log('Connected to Mongo Succesfully!')
    })
}

module.exports=connectToMongo;