const express = require('express')
const app = express()
const db = require('./db');
const { model } = require('mongoose');

const Person = require('./models/person');

app.get('/', function(req, res){
    res.send('Hello world');
})

// app.get('/rice', (req, res) => {
//     res.send('Sure, let me bring fried rice now....');
// })

// app.get('/idli', (req, res) => {
//     var custom_idli = {
//         name: 'rava idli',
//         size: '10 cm daimeter',
//         is_sambhar: true,
//         is_chutney: false
//     }
//     res.send(custom_idli);
// })

// app.post('/items', (req, res) => {
//     res.send("Data is saved");
// })


app.post('/person', async (res, req) => {
    try{
        const data = req.body;
        const newPerson = new Person(data);

        const savedPerson = await newPerson.save();
    }catch(err){
        
    }
})

app.listen(3000, () => {
    console.log("server is running, litsening on port 3000");
    
});