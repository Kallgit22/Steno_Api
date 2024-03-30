const mongoose = require('mongoose');

function Course() {
    const CourseSchema = new mongoose.Schema({
        id: {
            type: Number,
            unique:true,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        test: {
            type: Number,
            required: true
        },
        question: {
            type: Number,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        rating: {
            type: Number
            
        },
        description: {
            type: String
        },
        message: {
            type: String
        },
        context: {
            type: String
        },
        image:{
            type:String
        }
    }, { versionKey: false });
    return CourseSchema;
}

module.exports = Course;