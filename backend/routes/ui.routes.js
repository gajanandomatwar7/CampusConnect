const express=require('express');
const uiRoutes=express.Router();

uiRoutes.get('/',(req,res)=>{
    res.render('home');
});

uiRoutes.get('/login',(req,res)=>{
    const role=req.query.role;
    res.render('login',{role})
})

uiRoutes.get('/studentRegister',(req,res)=>{
    res.render('studentRegister')
})

module.exports=uiRoutes;
