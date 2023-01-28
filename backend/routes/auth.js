const express=require('express');
const User=require('../models/User')
const router=express.Router();
const {body,validationResult}=require('express-validator');

router.post('/createUser',[
    body('name','Enter a valid name').isLength({min:3}), //first is th field second is trhe error msg
    body('email','Enter a valid email').isEmail(),
    body('password').isLength({min:5}),
],(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    User.create({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email,
    }).then(user=>res.json(user))
    .catch(err=>{console.log(err);res.json({error:"Duplicate Email",message:err.message})});
    // console.log(req.body);
    // const user= User(req.body);
    // user.save();
    // res.send(req.body);
})


module.exports=router