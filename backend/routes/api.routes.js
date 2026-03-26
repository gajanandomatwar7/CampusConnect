const express=require('express');
const apiRoutes=express.Router();

apiRoutes.post('/studentLogin',(req,res)=>{
    
    res.redirect('studentDashboard');
});

module.exports=apiRoutes;