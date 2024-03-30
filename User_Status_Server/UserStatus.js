const express = require('express');
const DatabaseOperations = require('./DatabaseOperations');
const schema = require('./Schemas');
const dotEnv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();
dotEnv.config({ path: './.env' });

const url = process.env.URI;
const PORT = process.env.PORT || 4000;
const databaseName = process.env.DB_NAME;
const collectionName = process.env.COL_NAME;

// DatabaseOperations instance
const dbOperations = new DatabaseOperations("username","password");
dbOperations.connect(url,databaseName,collectionName,schema.userStatusSchema());

app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Route handlers
app.post('/Status/setStatus', async function (req, res) {
    try {
        const userAccount = {
            email: req.body.email,
        };
        const result = await dbOperations.insert(userAccount);
        if (result._id) {
            return res.status(200).json({ status: 'success'});
        } else {
            return res.status(500).json({ status: 'error',message:"Uknown Error" });
        }
        
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Internal server error',error:error });
    }
});

app.post('/Status/getStatus', async function (req, res) {
    try {
        const email = req.body.email;
        const field = req.body.field;
        console.log(field);
        const result = await dbOperations.getSpecificField(email,field);
        if (result) {
            console.log(result);
            const courseIds = result.map(entry => entry.courseId);
            console.log(courseIds);
            const data = await dbOperations.getCourse(courseIds);
            return res.status(200).json({ status: 'success', data: data });
        } else {
            return res.status(404).json({ status: 'error', message: 'Data not found' });
        }
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Internal server error',error:error });
    }
});

app.post('/Status/getAllStatus', async function (req, res) {
    try {
        const email = req.body.email;
        const result = await dbOperations.get(email);
        if (result) {
            return res.json({ status: 'success', data: result });
        } else {
            return res.status(404).json({ status: 'error', message: 'Data not found' });
        }
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Internal server error',error:error });
    }
});

app.post('/Status/updateStatus', async function (req, res) {
    try {
        const data = req.body;
        const status = await dbOperations.update(data);
        if (status) {
            return res.status(200).json({ status: 'success'});
        } else {
            return res.status(500).json({ status: 'error', message:"Status not updated" });
        }
        
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Internal server error',error:error });
    }
});

app.post('/Status/delete', async function (req, res) {
    try {
        const data = req.body;
        const result = await dbOperations.delete(data);
        if (result) {
            return res.status(200).json({ status: 'success'});
        } else {
            return res.status(500).json({ status: 'error', message:"Status not updated" });
        }
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Internal server error',error:error });
    }
});

app.post('/Status/deleteStatus', async function (req, res) {
    try {
        const { email } = req.body;
        const result = await dbOperations.deleteStatus(email);
        if (result) {
            return res.status(200).json({ status: 'success'});
        } else {
            return res.status(500).json({ status: 'error', message:"Status not updated" });
        }
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Internal server error',error:error });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server Listen on PORT: ${PORT}`);
});
