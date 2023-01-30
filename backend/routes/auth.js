const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const JWT_SECRET="MySignature";

//Route1: Creating User using /api/auth/createUser post Method

router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }), //first is th field second is trhe error msg
    body('email', 'Enter a valid email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //check for the email if it exists earlier
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Duplicate Email" })
        }
        const salt= await bcrypt.genSalt(10);
        const secPass=await bcrypt.hash(req.body.password,salt);
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        const data={
            user:{
               Id:user._id
            }
        }
        const authToken= jwt.sign(data,JWT_SECRET);
        res.json({authToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }
})


//Route 2: Authenticating User using /api/auth/login post Method

router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password','Password can not be blank!').exists(),
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try {
        let user=await User.findOne({email})
        if(!user)
        {
            return res.status(400).json({error:"Please try to login with correct credentials"});
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare)
        {
            return res.status(400).json({error:"Please try to login with correct credentials"});
        }
        const data={ //payloads
            user:{
               Id:user._id
            }
        }
        const authToken= jwt.sign(data,JWT_SECRET);
        res.json(authToken);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!")
    }
})

module.exports = router