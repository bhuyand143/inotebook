const connectToMongo=require('./db');
connectToMongo();
const express=require('express');
const app=express();

app.use(express.json());

//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

// app.get('/',(req,res)=>{
//     res.send('Hello World!');
// })

app.listen(5000,()=>{
    console.log('Listening at port 5000!');
})

