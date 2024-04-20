const mongoose = require('mongoose');

class DBOperations {
    constructor(DB_URL, DB_NAME) {
        this.dbUrl = DB_URL;
        this.dbName = DB_NAME;
        this.adsModel = null;
        this.courseModel = null;
        this.profileModel = null;
    }

    connect() {
        try {
            const finalUrl = this.dbUrl + this.dbName;
            mongoose.connect(finalUrl)
            console.log("Database Connected");
        } catch (error) {
            console.log("Database not Connected : ", error);
        }
    }

    createCollection(collName, schema) {
        try {
            switch (collName) {
                case "adsBanner":
                    this.adsModel = mongoose.model(collName, schema);
                    break;

                case "courseBanner":
                    this.courseModel = mongoose.model(collName, schema);
                    break;

                case "profilePic":
                    this.profileModel = mongoose.model(collName, schema);
                    break;
                default:
                    break;
            }

        } catch (error) {
            console.log("Error: ", error);
        }
    }

    async getData(action) {
        try {
            let data = null;
            switch (action) {
                case "adsBanner":
                    data = this.adsModel.find();
                    break;

                case "courseBanner":
                    data = this.courseModel.find();
                    break;

                case "profilePic":
                    data = this.profileModel.find();
                    break;
                default:
                    break;
            }
            console.log(data);
            if (data) {
                return data;
            } else {
                return null;
            }
        } catch (error) {
            console.log("Error: ", error);
            return null
        }
    }

    async insertData(action,id,path) {
        try {
            let status = null;
            switch (action) {
                case "adsBanner":
                    status = await this.adsModel.create({
                        id:id,
                        path:path
                    });
                    break;

                case "courseBanner":
                    status = await this.courseModel.create({
                        id:id,
                        path:path
                    });
                    break;

                case "profilePic":
                    status = await this.profileModel.create({
                        email:id,
                        path:path
                    });
                    break;
                default:
                    break;
            }
            console.log(status);
            if (status) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log("Error: ", error);
            return false;
        }
    }

    updateData() { }

    async deleteData(action,id) { 
        try {
            let status = null;
            switch (action) {
                case "adsBanner":
                    status = await this.adsModel.deleteOne({id:id});
                    break;

                case "courseBanner":
                    status = await this.courseModel.deleteOne({id:id});
                    break;

                case "profilePic":
                    status = await this.profileModel.deleteOne({email:id});
                    break;
                default:
                    break;
            }
            console.log(status);
            if (status) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log("Error: ", error);
            return false;
        }
    }

}

module.exports = DBOperations;