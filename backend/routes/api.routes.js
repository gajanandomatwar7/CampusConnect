const express = require('express');
const apiRoutes = express.Router();
const Student = require('../models/student.db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Teacher = require('../models/teacher.table');
const authMiddlware = require('../middleware/authMiddleware');
const Status = require('../models/status.table');
const checkValidity = require('../models/slots');
const TimeTable = require('../models/tt.table');
const { Op } = require('sequelize');

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
    } else {
        try {
            const user = await Teacher.findOne({ where: { userName } });
            if (!user) {
                return res.status(400).send("invalid credentials");
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).send("invalid");

            }
            const token = jwt.sign(
                { _id: user.id, userName: user.userName },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: false, // true in production
                sameSite: "strict",
            });

            res.redirect('../facultyDashboard');

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

apiRoutes.post('/facultyRegister', async (req, res) => {
    try {
        const { userName, firstName, lastName, designation, password } = req.body;

        if (!userName || !firstName || !lastName || !designation || !password) {
            return res.status(400).send("error while registring ");
        }
        const encPassword = await bcrypt.hash(password, 10);
        const teacher = await Teacher.create({
            userName,
            firstName,
            lastName,
            designation,
            password: encPassword
        });

        // console.log("teahcer created", teacher);

        const role = "teacher"
        res.redirect(`/login?role=${role}`);

    } catch (error) {
        console.log(error);
    }
});

apiRoutes.post('/updateStatus', authMiddlware, async (req, res) => {
    const { status } = req.body;
    if (!status) {
        return res.status(400).send('can not change the status');
    }

    const update = await Status.create({
        teacherId: teacherId,
        updatedStatus: status
    });

    res.render('facultyDashboard');
});

// apiRoutes.get('/faculty/:id/status', async (req, res) => {
//     const facultyId = req.params.id;

//     try {
//         const latestStatus = await Status.findOne({
//             where: { facultyId },
//             order: [['createdAt', 'DESC']]
//         });
//         if (latestStatus) {
//             const now = new Date();
//             const curTime = now.toTimeString().slice(0, 5);

//             const createdAt = latestStatus.createdAt;
//             const updatedTime = createdAt.toTimeString().slice(0, 5);

//             const isValid = checkValidity(curTime, updatedTime);

//             if (!isValid) {
//                 const today = now.toLocaleDateString('en-US', {
//                     weekday: 'long'
//                 });
//                 const teacher = await TimeTable.findAll({ where: { teacherId: facultyId, day: today } })
//                 if (!teacher) {
//                     return res.json({
//                         status: "Available"
//                     });
//                 } else {
//                     return res.json({
//                         status: "Busy"
//                     });
//                 }
//             }

//             return res.json({
//                 status: latestStatus.updatedStatus,
//             });
//         } else {
//             const now = new Date();
//             const today = now.toLocaleDateString('en-US', {
//                 weekday: 'long'
//             });
//             const teacher = await TimeTable.findAll({ where: { teacherId: facultyId, day: today } })
//             if (!teacher) {
//                 return res.json({
//                     status: "Available"
//                 });
//             } else {
                
//             }
//         }

//     } catch (error) {
//         console.log(error);

//     }
// });



apiRoutes.get('/faculty/:id/status', async (req, res) => {
    const facultyId = req.params.id;

    try {
        const now = new Date();

        const curTime = now.toTimeString().slice(0, 5);      
        const curTimeFull = now.toTimeString().slice(0, 8);  

        const today = now.toLocaleDateString('en-US', {
            weekday: 'long'
        });

        const latestStatus = await Status.findOne({
            where: { teacherId: facultyId },
            order: [['createdAt', 'DESC']]
        });

        if (latestStatus) {
            const updatedTime = latestStatus.createdAt
                .toTimeString()
                .slice(0, 5);

            const isValid = checkValidity(curTime, updatedTime);

            if (isValid) {
                return res.json({
                    source: "manual",
                    status: latestStatus.updatedStatus
                });
            }
        }

        const currentClass = await TimeTable.findOne({
            where: {
                teacherId: facultyId,
                day: today,
                startTime: { [Op.lte]: curTimeFull },
                endTime: { [Op.gt]: curTimeFull }
            }
        });

        if (currentClass) {
            return res.json({
                status: "Busy",
            });
        }

        return res.json({
            status: "Available"
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

apiRoutes.post('/addTTentry', (req, res) => {
    //adding tt entry
    //should we keep this as feature for admin side or what 
});

module.exports = apiRoutes;