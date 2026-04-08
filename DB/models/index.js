const Student = require("./student.model");
const Teacher = require("./teacher.model");
const TeacherAvailability = require("./teacherAvailability.model");
const TimeTable = require("./timetable.model");

Teacher.hasMany(TimeTable, { foreignKey: "teacherId" });
TimeTable.belongsTo(Teacher, { foreignKey: "teacherId" });

Teacher.hasMany(TeacherAvailability, { foreignKey: "teacherId" });
TeacherAvailability.belongsTo(Teacher, { foreignKey: "teacherId" });

module.exports = { Student, Teacher, TeacherAvailability, TimeTable };
