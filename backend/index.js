const connectToMongo=require('./db');
connectToMongo();
const express=require('express');
const app=express();

app.use(express.json());

//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(5000,()=>{
    console.log('iNotebook App Listening at port 5000!');
})

