const mongoose = require('mongoose');

// Define Mongoose schema's properties/structure
// DOCS: Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
// DOCS: By default, Mongoose adds an _id property to your schemas.
const schema = new mongoose.Schema({
    name: {
        required: true,
        trim: true,
        // minlength: [2, 'Name must be at least 2 characters.'],
        // maxlength: [50, 'Name must be at most 50 characters.'],
        // // Example of custom validation logic
        // validate: {
        //     // Function returns true when value is considered valid (logic can be as complex as needed)
        //     validator: function(val) {
                
        //         // Regular expression (regex) patterns for valid data
        //         const regexCode = /^[A-Za-z ]{2,50}$/

        //         // Test value against regex
        //         return regexCode.test(val)
        //     },
        //     message: () => `Name must be 2-50 characters (letters and spaces only).`
        // },
        type: String
    },
    price:{
        type:Number,
        required:true,
    },
    stockOnHand:{
        type:Number,
        required: true,
        min:[0,"Stock cannot be negative."],
        validate: {
            validator:function(val){
                return val >= 0;
            },
            message: ()=> `Stock on hand must be 0 or greater.`
        }
    },
    sku:{
        type: String,
        required: true,
        unique:true,
        validate:{
            validator: function(val){
                const regex = /^[A-Z]{2}-\d{4}-\d{2}$/;
                return regex.test(val);
            },
            message: ()=>`SKU must follow pattern as AA-1234-56`
        }
    }
    
}, {timestamps:true})

// Convert schema to Mongoose model
// DOCS: Models are responsible for creating and reading documents from the underlying MongoDB database.
// DOCS: Mongoose automatically looks for the plural, lowercased version of your model name
module.exports = mongoose.model('Product', schema)