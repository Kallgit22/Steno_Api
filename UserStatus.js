const express = require('express');
const DatabaseOperations = require('./DatabaseOperations');
const schema = require('./Schemas');
const dotEnv = require('dotenv');
const app = express();
dotEnv.config({ path: './.env' });

const url = process.env.URI;
const PORT = process.env.PORT || 4000;

// DatabaseOperations instance
const dbOperations = new DatabaseOperations("username","password");
dbOperations.connect(url,"Stenoexpert","UserAccountStatus",schema());

app.use(express.urlencoded({extended:true}));

app.post('/Status/setStatus',async function (req, res) {

    const userAccount = {
        email: req.body.email,
    };
    const id = await dbOperations.insert(userAccount);
    return res.send(id);
});

app.post('/Status/getStatus',async function (req, res) {
    const email = req.body.email;
    const result = await dbOperations.get(email);
    console.log(result);
    return res.send(result);
});

app.post('/Status/updateStatus',async function (req, res) {

    const data = req.body;
    const status = await dbOperations.update(data);
    console.log(status);
    return res.send(status);
});

app.post('/Status/delete',async function(req,res) {
    const data = req.body;
    const result = await dbOperations.delete(data);
    return res.send(result)
})

app.post('/Status/deleteStatus',async function (req, res) {

    const {email} = req.body;
    const result = await dbOperations.deleteStatus(email);
    console.log(result);
    return res.send(result);
});

app.listen(PORT, () => { console.log(`Server Listen on PORT: ${PORT}`); });