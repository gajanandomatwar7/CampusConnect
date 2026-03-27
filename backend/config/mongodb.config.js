//fucntion to connect monogodb 
//use environment varible for mongodb url 
const mongoose=require('mongoose');

function connectToDb(){
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("DB connected");
    })
}
module.exports=connectToDb;