const express = require('express');
const apiRoutes = express.Router();
const Student = require('../models/student.db');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const Teacher=require('../models/teacher.table');


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
        try {
            
        } catch (error) {
            console.log(error);
        }
    }
})

apiRoutes.post('/studentRegister', async (req, res) => {
    try {
        const { firstName, lastName, userName, PRN, dept, semester, password } = req.body;

        const encPassword = await bcrypt.hash(password, 10);

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

apiRoutes.post('/facultyRegister',async (req,res)=>{
    try {
        const { userName, firstName, lastName, designation } = req.body;

        if (!userName || !firstName || !lastName || !designation) {
            return res.status(400).send("error while registring ");
        }

        const teacher = await Teacher.create({
            userName,
            firstName,
            lastName,
            designation
        });

        // console.log("teahcer created",teacher);
        
        const role="teacher"
        res.redirect(`/login?role=${role}`);

    } catch (error) {
        console.log(error);
    }
})
module.exports = apiRoutes;