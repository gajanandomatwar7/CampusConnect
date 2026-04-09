const express=require('express');
const uiRoutes=express.Router();
const authMiddlware=require('../middleware/authMiddleware');
const Teacher=require('../models/teacher.table');
const Student=require('../models/student.db');
const Message=require('../models/message.db');
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

uiRoutes.get('/facultyDashboard',authMiddlware,async (req,res)=>{
     try {
        const students = await Student.find(); 

        res.render("facultyDashboard", {
            students
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading dashboard");
    }
});

uiRoutes.get('/chatview/:id/:role', authMiddlware, async (req, res) => {
    try {
        const receiverId = req.params.id;
        const receiverType = req.params.role;

        const senderId = req.user.id;   
        let senderType;   
        if(receiverType=="student"){
             senderType = "teacher"; 
        } else{
             senderType = "student";
        }
         
        console.log("hello" + receiverId, receiverType,senderId,senderType);


        // let receiver;

        // if (receiverType === "teacher") {
        //     receiver = await Teacher.findByPk(receiverId);
        // } else if (receiverType === "student") {
        //     receiver = await Student.findOne(receiverId);
        // }

        // if (!receiver) {
        //     return res.status(404).send("User not found");
        // }

        res.render("chatview", {
            senderId,
            receiverId,
            senderType,
            receiverType
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("errorr");
    }
});

uiRoutes.get('/find-teacher', authMiddlware, (req, res) => {
    const user = req.user;    
    res.render('findTeacher', {studentId: user.id});
});

uiRoutes.get('/profile', authMiddlware, async (req, res) => {
    try {
        const userName = (req.query.id);
        if(!userName){
            return res.status(400).send("invalid url");
        }
        const teacher = await Teacher.findOne({where: {userName}});
        console.log(teacher.id);
        
        if (!teacher) {
            return res.status(404).send("Teacher not found");
        }

        res.render("profile", {
            profileUser: teacher,
            profileId:teacher.id,
            role: "teacher"
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading profile");
    }
});

module.exports=uiRoutes;
