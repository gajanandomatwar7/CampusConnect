const { DataTypes }=require('sequelize');
const { sequelize }=require('../config/mysqldb.config');

const Status= sequelize.define('Status',{
    teacherId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Teacher',
            key:'id'
        }
    },
    updatedStatus:{
        type:DataTypes.ENUM('Busy','onLeave','Available'),
        allowNull:false,
    },
});

Status.associate = (models) => {
    Status.belongsTo(models.Teacher, {
        foreignKey: "teacherId",
        as: "teacher"
    });
};

module.exports=Status;