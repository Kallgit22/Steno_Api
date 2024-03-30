const mongoose = require('mongoose');
const Schema = require('./Schemas');

class DatabaseOperations {
    constructor(username,password) {
        this.model = null;
        this.model2 = null;
        this.Username = username;
        this.Password = password;
    }

    connect(url,databasename,collectionName,schema) {
        try {
            mongoose.connect(url+`/${databasename}`, { useNewUrlParser: true, useUnifiedTopology: true });
            this.model = mongoose.model(collectionName,schema);
            this.model2 = mongoose.model("Course",Schema.Course());
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    }

     close() {
        mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    }

    async insert(data) {
        try {
            const status = await this.model.create(data);
            return status;
        } catch (error) {
            console.error('Error inserting document:', error);
        }
    }

    async deleteStatus(query) {
        try {
            const result = await this.model.deleteOne({email:query});
            return result;
        } catch (error) {
            console.error('Error deleting documents:', error);
        }
    }

    async update(data) {
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
    
            const result = await this.model.updateOne({ email: data.email }, updateQuery);
            return result;
        } catch (error) {
            console.error('Error updating documents:', error);
            return null;
        }
    }

    async get(email){
        try {
            const result = await this.model.findOne({email:email});
            return result;
        } catch (error) {
            return error;
        }
    }

    async getCourse(ids) {
        try {
            const result = await this.model2.find({ id: { $in: ids } });
            return result;
        } catch (error) {
            throw error; // Throw the error instead of returning it
        }
    }

    async getSpecificField(email, fieldName) {
        try {
            // Find the document with the given email
            const document = await this.model.findOne({ email: email });
            // If the document is found
            if (document) {
                // Access the specific field in the document
                const fieldValue = document[fieldName];
                return fieldValue;
            } else {
                // Document not found
                return null;
            }
        } catch (error) {
            // Error handling
            console.error('Error fetching data:', error);
            return { success: false, message: 'Error fetching data' };
        }
    }
    

    async delete(data) {
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
    
            const result = await this.model.updateOne({ email: data.email }, updateQuery);
            return result;
        } catch (error) {
            console.error('Error updating documents:', error);
            return null;
        }
    }
    
}

module.exports = DatabaseOperations;