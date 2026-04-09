const Teacher = require('./teacher.table');
const Status = require('./status.table');
const TimeTable = require('./tt.table');

const models = {
    Teacher,
    Status,
    TimeTable
};

// Run associations
Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
    }
});

module.exports = models;