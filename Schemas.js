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
                type: Number
            }
        }],
        myCartCourseList: [{
            _id: false,
            courseId: {
                type: Number
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
        }
    });



    return UserAccountStatusSchema;
}

module.exports = userStatusSchema;