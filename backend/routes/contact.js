const express = require('express');
const router = express.Router();
const Contact=require("../models/contact");

router.post('/postfeedback',async (req, res) => {
    try 
    {
        console.log(req.body.lastname);
        const contacts = await Contact.create({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            feedback:req.body.feedback
        }); 
        contacts.success=true;
        console.log(contacts)
        res.send(contacts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!")
    }
})

module.exports=router