const mongoose = require('mongoose');

// Counter Schema for empId
const empIdCounterSchema = new mongoose.Schema({
    _id:{
        type: String,
        required: true
    },
    seq:{
        type: Number,
        default:101
    }
})
const EmpId = mongoose.model('EmpId',empIdCounterSchema)

const employeeSchema = new mongoose.Schema({
    empId:{
        type:Number,
        require:true,
        unique:true,
    },
    firstName: {
        type:String,
        required: true,
        trim: true,
        minlength: [2, 'Firstname must be at least 2 characters.'],
        maxlength: [50, 'Firstname must be at most 50 characters.'],
        // Validating employee's Firstname 
        validate: {
            validator: function(val) {
                const regexCode = /^[A-Za-z ]{2,50}$/
                // Test value against regex
                return regexCode.test(val)
            },
            message: () => `Firstname must be 2-50 characters (letters and spaces only).`
        },
    },
    lastName: {
        type:String,
        required: true,
        trim: true,
        minlength: [2, 'Lastname must be at least 2 characters.'],
        maxlength: [50, 'Lastname must be at most 50 characters.'],
        // Validating employee's Lastname 
        validate: {
            validator: function(val) {
                const regexCode = /^[A-Za-z ]{2,50}$/
                // Test value against regex
                return regexCode.test(val)
            },
            message: () => `Lastname must be 2-50 characters (letters and spaces only).`
        },
    },
    username:{
        type:String,
        required: true,
        trim: true,

        // Validating username 
        validate: {
            validator: function(val) {
                const regexCode = /^[A-Za-z][A-Za-z0-9_.@$]{2,29}$/
                // Test value against regex
                return regexCode.test(val)
            },
            message: () => `Username must start with a letter, can include letters, numbers, _, ., @, $ and be 3-30 characters long.`
        },

    },
     password:{
        type:String,
        required: true,
    },
    roles:{
        types:[String],
        default:['user']
    }
}, {timestamps:true})

// Pre-save hook to auto-increment empId
employeeSchema.pre('save', async function(next){
    if(this.isNew){
        const counter = await EmpId.findByIdAndUpdate(
            {
            _id:'employee'
        },
        {
            $inc:{seq:1}
        },
        {
            new:true,
            upsert:true
        }
    )
    this.empId = counter.seq 
    }
    next();
})

// Convert schema to Mongoose model
// DOCS: Models are responsible for creating and reading documents from the underlying MongoDB database.
// DOCS: Mongoose automatically looks for the plural, lowercased version of your model name
module.exports = mongoose.model('Employee', employeeSchema)