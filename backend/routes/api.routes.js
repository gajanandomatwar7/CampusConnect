const express = require('express');
const apiRoutes = express.Router();
const Student = require('../models/student.db');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');

apiRoutes.post('/login', async (req, res) => {
    const role = req.query.role;
    const { userName, password } = req.body;
    if (role == "student") {
        try {
            const user = await Student.findOne({ userName });
            if (!user) {
                return res.status(404).send("Invalid ");
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(404).send("Invalid Credentials");
            }
            const token = jwt.sign(
                { _id: user._id, userName: user.userName },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: false, 
                sameSite: "strict",
            });
            res.redirect("../studentDashboard");

        } catch (error) {
            console.log(error);

        }
    }else{
        
    }
})

apiRoutes.post('/studentRegister', async (req, res) => {
    try {
        const { firstName, lastName, userName, PRN, dept, semester, password } = req.body;

        const encPassword = await bcrypt.hash(password, 10)
        // Create new student
        const newStudent = new Student({
            firstName,
            lastName,
            userName,
            PRN,
            dept,
            semester,
            password: encPassword
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

apiRoutes.post('/facultyRegister',(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
    }
})
module.exports = apiRoutes;