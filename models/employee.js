const mongoose = require('mongoose')


const employeeSchema = mongoose.Schema(
    {
        name:
        {
            type: String,
            required: [true, "Please enter a product name"]
        },
        email: {
            type: String,
            required: true
        }
    },
    {
        timestamp: true
    }

)


const employee = mongoose.model('employee', employeeSchema);
module.exports = employee;