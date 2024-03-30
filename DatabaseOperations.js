const mongoose = require('mongoose');

class DatabaseOperations {
    constructor(username,password) {
        this.model = null;
        this.Username = username;
        this.Password = password;
    }

    connect(url,databasename,collectionName,schema) {
        try {
            mongoose.connect(url+`/${databasename}`, { useNewUrlParser: true, useUnifiedTopology: true });
            this.model = mongoose.model(collectionName,schema);
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    }

     close() {
        mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    }

    insert(data) {
        try {
            const status = this.model.create(data);
            return status;
        } catch (error) {
            console.error('Error inserting document:', error);
        }
    }

    deleteStatus(query) {
        try {
            const result = this.model.deleteOne({email:query});
            return result;
        } catch (error) {
            console.error('Error deleting documents:', error);
        }
    }

    update(data) {
        try {
            let updateQuery;
            switch(data.field) {
                case "myFavCourseList":
                    updateQuery = { $push: { myFavCourseList: { courseId: data.courseId } } };
                    break;
                case "myCourseList":
                    updateQuery = { $push: { myCourseList: { courseId: data.courseId } } };
                    break;
                case "myCartCourseList":
                    updateQuery = { $push: { myCartCourseList: { courseId: data.courseId } } };
                    break;
                case "myFavVideoList":
                    updateQuery = { $push: { myFavVideoList: { courseId: data.courseId, videoIndex: data.videoIndex } } };
                    break;
                default:
                    console.error("Invalid field specified for delete operation");
                    return null;
            }
    
            const result = this.model.updateOne({ email: data.email }, updateQuery);
            return result;
        } catch (error) {
            console.error('Error updating documents:', error);
            return null;
        }
    }

    get(email){
        try {
            const result = this.model.findOne({email:email});
            return result;
        } catch (error) {
            return error;
        }
    }

    delete(data) {
        try {
            let updateQuery;
            switch(data.field) {
                case "myFavCourseList":
                    updateQuery = { $pull: { myFavCourseList: { courseId: data.courseId } } };
                    break;
                case "myCourseList":
                    updateQuery = { $pull: { myCourseList: { courseId: data.courseId } } };
                    break;
                case "myCartCourseList":
                    updateQuery = { $pull: { myCartCourseList: { courseId: data.courseId } } };
                    break;
                case "myFavVideoList":
                    updateQuery = { $pull: { myFavVideoList: { courseId: data.courseId, videoIndex: data.videoIndex } } };
                    break;
                default:
                    console.error("Invalid field specified for delete operation");
                    return null;
            }
    
            const result = this.model.updateOne({ email: data.email }, updateQuery);
            return result;
        } catch (error) {
            console.error('Error updating documents:', error);
            return null;
        }
    }
    
}

module.exports = DatabaseOperations;