const express = require("express");
const apiRoutes = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student=require("../models/student.table");
const Teacher = require("../models/teacher.table");
const authMiddlware = require("../middleware/authMiddleware");
// const TimeTable = require("../models/tt.table");
const { Op } = require("sequelize");
// const uploadStudentImage = require('../controller/uploadImage');

apiRoutes.post("/login", async (req, res) => {
    const role = req.query.role;
    const { userName, password } = req.body;

    if (role === "student") {
        try {
            const user = await Student.findOne({
                where: { userName },
            });

            if (!user) {
                return res.status(404).send("Invalid Credentials");
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(404).send("Invalid Credentials");
            }

            const token = jwt.sign(
                { id: user.id, userName: user.userName },
                process.env.JWT_SECRET,
                { expiresIn: "1d" },
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
            });

            res.redirect("../studentDashboard");
        } catch (error) {
            console.log(error);
            return res.status(500).send("Server Error");
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
                { expiresIn: "1d" },
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: false, // true in production
                sameSite: "strict",
            });

            res.redirect("../facultyDashboard");
        } catch (error) {
            console.log(error);
        }
    }
});

apiRoutes.post("/studentRegister", async (req, res) => {
    try {
        const { firstName, lastName, userName, PRN, dept, semester, password } =
            req.body;

        const encPassword = await bcrypt.hash(password, 10);

        await Student.create({
            firstName,
            lastName,
            userName,
            PRN: Number(PRN),
            dept,
            semester: Number(semester),
            password: encPassword,
        });

        res.send("Student Registered Successfully ✅");

    } catch (error) {
        console.error(error);

        if (error.name === "SequelizeUniqueConstraintError") {
            return res.send("PRN already exists ❌");
        }

        res.send("Error registering student ❌");
    }
});

apiRoutes.post("/facultyRegister", async (req, res) => {
    try {
        const { firstName, lastName, userName, department, designation, emailID, password } = req.body;

        if (!userName || !firstName || !lastName || !designation || !password || !emailID || !department) {
            return res.status(400).send("Missing fields");
        }

        const encPassword = await bcrypt.hash(password, 10);

        await Teacher.create({
            firstName,
            lastName,
            userName,
            department,
            designation,
            emailID,
            password: encPassword
        });

        return res.send("registratered successfully ");

    } catch (error) {
        console.log(error);
        res.status(500).send("Error registering faculty");
    }
});

apiRoutes.post("/updateStatus", authMiddlware, async (req, res) => {
    const { status } = req.body;
    if (!status) {
        return res.status(400).send("can not change the status");
    }

    const update = await Status.create({
        teacherId: teacherId,
        updatedStatus: status,
    });

    res.render("facultyDashboard");
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

apiRoutes.get("/faculty/:id/status", async (req, res) => {
    const facultyId = req.params.id;

    try {
        const now = new Date();

        const curTime = now.toTimeString().slice(0, 5);
        const curTimeFull = now.toTimeString().slice(0, 8);

        const today = now.toLocaleDateString("en-US", {
            weekday: "long",
        });

        const latestStatus = await Status.findOne({
            where: { teacherId: facultyId },
            order: [["createdAt", "DESC"]],
        });

        if (latestStatus) {
            const updatedTime = latestStatus.createdAt.toTimeString().slice(0, 5);

            const isValid = checkValidity(curTime, updatedTime);

            if (isValid) {
                return res.json({
                    source: "manual",
                    status: latestStatus.updatedStatus,
                });
            }
        }

        const currentClass = await TimeTable.findOne({
            where: {
                teacherId: facultyId,
                day: today,
                startTime: { [Op.lte]: curTimeFull },
                endTime: { [Op.gt]: curTimeFull },
            },
        });

        if (currentClass) {
            return res.json({
                status: "Busy",
            });
        }

        return res.json({
            status: "Available",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

// apiRoutes.post('/uploadStdentImage',authMiddlware,upload.single('image'),uploadStudentImage(req,res));

apiRoutes.post("/addTTentry", (req, res) => {
    //adding tt entry
    //should we keep this as feature for admin side or what
});

//experimenting

apiRoutes.get("/find-teacher", async (req, res) => {
    try {
        const { search } = req.query;

        let whereCondition = {};

        if (search && search.trim() !== "") {
            whereCondition = {
                [Op.or]: [
                    { firstName: { [Op.like]: `%${search}%` } },
                    { lastName: { [Op.like]: `%${search}%` } },
                ],
            };
        }

        const teachers = await Teacher.findAll({
            where: whereCondition,
            attributes: ["username", "firstName", "lastName"],
        });

        return res.json(teachers);
    } catch (err) {
        console.error("ERROR IN FIND TEACHER:", err);
        return res.status(500).json({
            error: err.message,
        });
    }
});

module.exports = apiRoutes;
