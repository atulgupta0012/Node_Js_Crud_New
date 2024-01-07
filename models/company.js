const mongoose = require('mongoose')


const companySchema = mongoose.Schema(
    {
        name:
        {
            type: String,
            required: [true, "Please enter a  name"]
        },
        location: {
            type: String,
            required: true
        }
    },
    {
        timestamp: true
    }

)


const company = mongoose.model('company', companySchema);
module.exports = company;