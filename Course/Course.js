const express = require('express');
const DatabaseOperations = require('./DatabaseOperation');
const schema = require('./Schema');
const dotEnv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();
dotEnv.config({ path: './.env' });

const url = process.env.URI;
const PORT = process.env.PORT || 8000;
const databaseName = process.env.DB_NAME;
const collectionName = process.env.COL_NAME;

// DatabaseOperations instance
const dbOperations = new DatabaseOperations("username","password");
dbOperations.connect(url,databaseName,collectionName,schema());

app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

app.post('/addCourse',async function(req,res) {

    const {id,title,time,test,question,author,price} = req.body;
    const courseData = {
        id:id,
        title: title,
        time: time,
        test: test,
        question: question,
        author:author,
        price:price
    }
    try {
        let result = await dbOperations.addCourse(courseData);
        console.log(result);
    if (result) {
        return res.status(200).json({status:"Success",message:"Course Added Successfully"});
    } else {
        return res.status(200).json({status:"Error",message:"Course Not Added"});
    }
    } catch (error) {
        return res.status(200).json({status:"Error",message:"Course Not Added",error:error});
    }
});

app.post('/updateCourse',async function(req,res) {
    const {id,title,time,test,question,author,price,description,message,context} = req.body;
    const newData = {
        title: title,
        time: time,
        test: test,
        question: question,
        author:author,
        price:price,
        description:description,
        message:message,
        context:context
    }
    try {
        let result = await dbOperations.updateCourse(id,newData);
        console.log(result);
    if (result) {
        return res.status(200).json({status:"Success",message:"Course Updated Successfully"});
    } else {
        return res.status(200).json({status:"Error",message:"Course Not updated"});
    }
    } catch (error) {
        return res.status(200).json({status:"Error",message:"Course Not updated",error:error});
    }

});

app.post('/deleteCourse',async function(req,res) {
    const {id} = req.body;
    try {
        let result = await dbOperations.deleteCourse(id);
        console.log(result);
    if (result) {
        return res.status(200).json({status:"Success",message:"Course Deleted Successfully"});
    } else {
        return res.status(200).json({status:"Error",message:"Course Not Deleted"});
    }
    } catch (error) {
        return res.status(200).json({status:"Error",message:"Course Not Deleted",error:error});
    }
});

app.post('/getFilteredCourse',async function(req,res) {
    const id = req.body.id;
    try {
        let result = await dbOperations.getOneCourse(id);
        console.log(result);
    if (result) {
        return res.status(200).json({status:"Success",data:result});
    } else {
        return res.status(200).json({status:"Error",message:"Data not found, please check your id"});
    }
    } catch (error) {
        return res.status(200).json({status:"Error",message:"Data not found, please check your id",error:error});
    }
});

app.post('/getCourse',async function(req,res) {
    try {
        let result = await dbOperations.getCourse();
        console.log(result);
    if (result) {
        return res.status(200).json({status:"Success",data:result});
    } else {
        return res.status(200).json({status:"Error",message:"Data not found"});
    }
    } catch (error) {
        return res.status(200).json({status:"Error",message:"Internal Server Error",error:error});
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server Listen on PORT: ${PORT}`);
});