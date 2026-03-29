const {Sequelize}=require('sequelize');

//user name, db name, password 
const sequelize=new Sequelize('CampusConnect','CampusConnect','CampusConnect',{
    host:'campusconnect.cramem8oqel5.ap-south-1.rds.amazonaws.com',
    dialect:'mysql'
});

async function connectDb(){
    try {
        await sequelize.authenticate();
        console.log("Mysql Connected");
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports={connectDb,sequelize}; 