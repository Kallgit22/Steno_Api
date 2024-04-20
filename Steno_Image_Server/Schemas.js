const mongoose = require('mongoose');

class Schemas{
    constructor(){}
    adsBannerSchema(){
        const adsSchema = new mongoose.Schema({
            id: {
                type: Number,
                unique:true,
                required: true
            },
            path: {
                type: String,
                required: true
            }
        })
        return adsSchema;
    }

    courseBannerSchema(){
        const courseBannerSchema = new mongoose.Schema({
            id: {
                type: Number,
                unique:true,
                required: true
            },
            path: {
                type: String,
                required: true
            }
        })
        return courseBannerSchema;
    }

    profileSchema(){
        const profileSchema = new mongoose.Schema({
            email: {
                type: String,
                unique:true,
                required: true
            },
            path: {
                type: String,
                required: true
            }
        })
        return profileSchema;
    }
}

module.exports = new Schemas();