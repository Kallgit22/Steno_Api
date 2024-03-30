const mongoose = require('mongoose');


class DatabaseOperations {
    constructor(username, password) {
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

    async addCourse(data){
        try {
            const status = await this.model.create(data);
            return status;
        } catch (error) {
            console.error('Error inserting document:', error);
        }
    }

    async deleteCourse(courseId){
        try {
            const status = await this.model.deleteOne({id:courseId});
            return status;
        } catch (error) {
            console.error('Error inserting document:', error);
        }
    }

    async updateCourse(courseId,data){
        try {
            let query = {$set:data};
            const status = await this.model.updateOne({ id: courseId },query);
            return status;
        } catch (error) {
            console.error('Error inserting document:', error);
        }
    }

    async getOneCourse(courseId){
        try {
            const status = await this.model.findOne({id:courseId});
            return status;
        } catch (error) {
            console.error('Error inserting document:', error);
        }
    }

    async getCourse(){
        try {
            const status = await this.model.find();
            return status;
        } catch (error) {
            console.error('Error inserting document:', error);
        }
    }
}
module.exports = DatabaseOperations;