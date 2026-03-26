const express=require('express');
const uiRoutes=express.Router();

uiRoutes.get('/',(req,res)=>{
    res.render('home');
})

module.exports=uiRoutes;