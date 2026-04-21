const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/mysqldb.config');

const Student = sequelize.define('studentModel', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    PRN: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        validate: {
            isValidPRN(value) {
                if (!Number.isInteger(value) || value < 100000000 || value > 999999999) {
                    throw new Error(`${value} is not a valid PRN!`);
                }
            }
        }
    },

    dept: {
        type: DataTypes.ENUM('IT'),
        allowNull: false,
    },

    semester: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isValidSemester(value) {
                if (!Number.isInteger(value) || value < 3 || value > 8) {
                    throw new Error(`${value} is not a valid Semester!`);
                }
            }
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }

}, {
    tableName: 'Students',   
    timestamps: true  
           
});

module.exports = Student;