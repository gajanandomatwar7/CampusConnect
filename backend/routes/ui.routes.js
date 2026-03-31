const express=require('express');
const uiRoutes=express.Router();
const authMiddlware=require('../middleware/authMiddleware');

uiRoutes.get('/',(req,res)=>{
    res.render('home');
});

uiRoutes.get('/login',(req,res)=>{
    const role=req.query.role;
    res.render('login',{role})
});

uiRoutes.get('/studentRegister',(req,res)=>{
    res.render('studentRegister')
});

uiRoutes.get('/studentDashboard',authMiddlware,(req,res)=>{
    res.render('studentDashboard');
});

uiRoutes.get('/facultyRegister',(req,res)=>{
    res.render('facultyRegister');
});

uiRoutes.get('/facultyDashboard',authMiddlware,(req,res)=>{
    res.render('facultyDashboard');
})

module.exports=uiRoutes;
