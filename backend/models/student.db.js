//create the schema for student and export the db 
//create .env file add mongodb url, 
//studentModel as name for student schema model
//create a proper structure of schema 


//write function inside config folder to connect with mongo db atlas 
const mongoose=require('mongoose')

const StudentSchema= new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    userName:{
        type: String,
        required: true,
    },
    PRN:{
        type: Number,
        required: true,
        unique: true,
        validate:function(n){
            return Number.isInteger(n) && n>=100000000 && n<=999999999;
        },
        message: props => `${props.value} is not a valid PRN!`
    },
    dept:{
        type:String,
        enum:['IT'],
        required: true,
    },
    semester:{
        type: Number,
        required:true,
        validate:function(n){
            return Number.isInteger(n) && n>=3 && n<=8;
        },
        message: props=>`${props.value} is not a valid Semester!`
    },
    password:{
        type:String,
        required: true,
    }
})

module.exports=mongoose.model("studentModel",StudentSchema);