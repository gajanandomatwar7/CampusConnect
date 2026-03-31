//authentication middleware so that the logged in users can only navigate between the pages
const jwt = require("jsonwebtoken");
const studentModel = require("../models/student.db");
const Teacher = require("../models/teacher.table");

const authMiddlware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send("Login required");
    }
    try {
        let verified = false;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const student = await studentModel.findOne({
            userName: decoded.userName,
        });
        if (student) {
            verified = true;
            req.user = student;
        } else {
            const teacher = await Teacher.findOne({where:{userName}});
            req.user = teacher;
            verified = true;
        }

        if (verified) {
            next();
        }else{
            return res.send("log ing required");
        }
    } catch (err) {
        console.log(err);
        return res.status(401).send("Invalid or expired token");
    }
};

module.exports = authMiddlware;
