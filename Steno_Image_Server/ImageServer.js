const express = require('express');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbOperation = require('./DBOperations');
const Schemas = require('./Schemas');

dotenv.config();
const server = express();
const dbUrl = process.env.URI;
const dbName = process.env.DB_NAME;
const PORT = process.env.PORT || 9000;

//Middle Ware
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(express.json());
server.use(express.static(path.join(__dirname,'/uploads')));

//Multer Config
const adsBannerStorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'uploads/adsBanner/')
    },
    filename: function (req, file, cb) {
        // Define the filename to be unique
        cb(null, Date.now() + file.originalname)
    }
});

const courseBannerStorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'uploads/courseBanner/')
    },
    filename: function (req, file, cb) {
        // Define the filename to be unique
        cb(null, Date.now() + file.originalname)
    }
});

const profileStorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'uploads/userProfile/')
    },
    filename: function (req, file, cb) {
        // Define the filename to be unique
        cb(null, Date.now() + file.originalname)
    }
});

//Use Multer
const uploadAds = multer({ storage: adsBannerStorage });
const uploadCourse = multer({ storage: courseBannerStorage });
const uploadProfile = multer({ storage: profileStorage });

//Get Schemas
const adsSchema = Schemas.adsBannerSchema();
const courseSchema = Schemas.courseBannerSchema();
const profileSchema = Schemas.profileSchema();

//Database Initialization
const database = new dbOperation(dbUrl,dbName);
database.connect();
database.createCollection("adsBanner",adsSchema);
database.createCollection("courseBanner",courseSchema);
database.createCollection("profilePic",profileSchema);


//Server Routing

server.post('/getBanner',async (req,res)=>{
    try {
        const data = await database.getData(req.body.action);
        if (data) {
            return res.status(200).json({status:"Success", data:data});
        }else{
            return res.status(200).json({status:"Failed", message:"Data not Found"});
        }
    } catch (error) {
        return res.status(500).json({status:"Failed", message:"Internal Server Error"});
    }
});

server.post('/uploadAdsBanner',uploadAds.single('adsBanner'),async (req,res)=>{
    try {
        const path = req.file.path;
        const status = await database.insertData(req.body.action,req.body.id,path);
        if (status) {
            return res.status(200).json({status:"Success", message:"Banner Uploaded Successfully"});
        }else{
            return res.status(200).json({status:"Failed", message:"Banner not Uploaded"});
        }
    } catch (error) {
        return res.status(500).json({status:"Failed", message:"Internal Server Error"});
    }
});

server.post('/uploadCourseBanner',uploadCourse.single('courseBanner'),async (req,res)=>{
    try {
        const path = req.file.path;
        const status = await database.insertData(req.body.action,req.body.id,path);
        if (status) {
            return res.status(200).json({status:"Success", message:"Banner Uploaded Successfully"});
        }else{
            return res.status(200).json({status:"Failed", message:"Banner not Uploaded"});
        }
    } catch (error) {
        return res.status(500).json({status:"Failed", message:"Internal Server Error"});
    }
});


server.post('/uploadProfilePic',uploadProfile.single('pic'),async (req,res)=>{
    try {
        const path = req.file.path;
        const status = await database.insertData(req.body.action,req.body.email,path);
        if (status) {
            return res.status(200).json({status:"Success", message:"Profile pic Uploaded Successfully"});
        }else{
            return res.status(200).json({status:"Failed", message:"Banner not Uploaded"});
        }
    } catch (error) {
        return res.status(500).json({status:"Failed", message:"Internal Server Error"});
    }
});


server.post('/delete',async (req,res)=>{
    try {
        const data = await database.getData(req.body.action);
        if (data) {
            return res.status(200).json({status:"Success", data:data});
        }else{
            return res.status(200).json({status:"Failed", message:"Data not Found"});
        }
    } catch (error) {
        return res.status(500).json({status:"Failed", message:"Internal Server Error"});
    }
});


server.listen(PORT,()=>{console.log("Server Listen On PORT: ",PORT);});