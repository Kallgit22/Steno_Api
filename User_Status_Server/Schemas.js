const mongoose = require('mongoose');

function userStatusSchema() {

    const UserAccountStatusSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true,
            unique: true
        },
        myCourseList: [{
            _id: false,
            courseId: {
                type: Number
            }
        }],
        myFavCourseList: [{
            _id: false,
            courseId: {
                type: Number,
                unique:true
            }
        }],
        myCartCourseList: [{
            _id: false,
            courseId: {
                type: Number,
                unique:true
            }
        }],
        myFavVideoList: {
            type: [{
                _id: false,
                courseId: {
                    type: Number
                },
                videoIndex: {
                    type: Number
                }
            }],
            default: []
        },
        loginStatus:{
            type:Boolean
        }
    });
    return UserAccountStatusSchema;
}

function Course() {
    const CourseSchema = new mongoose.Schema({
        _id: false,
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
    });
    return CourseSchema;
}

module.exports = {
    userStatusSchema: userStatusSchema,
    Course: Course
};