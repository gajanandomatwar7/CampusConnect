const express=require('express');
const apiRoutes=express.Router();
const Student=require('../models/student.db');
const bcrypt=require('bcrypt')

apiRoutes.post('/studentLogin',(req,res)=>{
    
    res.redirect('studentDashboard');
});
apiRoutes.post('/facultyLogin',(req,res)=>{
    
    res.redirect('facultyDashboard');
})

apiRoutes.post('/studentRegister',async (req,res)=>{
    try {
        const { firstName, lastName, userName, PRN, dept, semester, password } = req.body;

        const encPassword=await bcrypt.hash(password,10)
        // Create new student
        const newStudent = new Student({
            firstName,
            lastName,
            userName,
            PRN,
            dept,
            semester,
            password:encPassword
        });

        await newStudent.save();

        res.send("Student Registered Successfully ✅");

    } catch (error) {
        console.error(error);

        // Duplicate PRN error
        if (error.code === 11000) {
            return res.send("PRN already exists ❌");
        }

        res.send("Error registering student ❌");
    }
});
module.exports=apiRoutes;