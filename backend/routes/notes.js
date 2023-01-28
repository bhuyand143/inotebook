const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    obj={
        a:'this',
        b:'that'
    }
    res.json([])
})


module.exports=router