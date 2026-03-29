const {sequelize}=require('../config/mysqldb.config');

async function create() {
    try {
        await sequelize.sync();
        console.log("table Created ");
        
    } catch (error) {
        console.log(error);
        
    }
}
module.exports=create;
//use only if new table is created or schema is changed 
