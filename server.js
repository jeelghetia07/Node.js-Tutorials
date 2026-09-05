const express = require('express')
const app = express()
const db = require('./db');
const { model } = require('mongoose');
require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Person = require('./models/person');
const menuItem = require('./models/menuItem');

const PORT = process.env.PORT || 3000

const bodyParser = require('body-parser');
app.use(bodyParser.json());     // req.body;

app.use(express.json());

// Middleware function
const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
    next();         // move on to the next phase
}

app.use(logRequest);


passport.use(new LocalStrategy (async (USERNAME, PASSWORD, done) => {
    try{
        console.log('Received credentials : ', USERNAME, PASSWORD);
        const user = await Person.findOne({username: USERNAME});          // this means, if it finds in the DB then, is username == USERNAME ???

        if(!user){
            return done(null, false, {message: "Incorrect Username"});
        }

        const isPasswordMatched = user.password === PASSWORD ? true : false;
        if(isPasswordMatched){
            return done(null, user);
        }
        else{
            return done(null, false, {message : "Password not valid"});
        }
    }catch(err){
        return done(err);
    }
}));

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});
// now here we implement authentication
app.get('/', localAuthMiddleware , function(req, res){
    res.send('Welcome to our Hotel');
})

// app.get('/rice', (req, res) => {
//     res.send('Sure, let me bring fried rice now....');
// })

// // app.get('/idli', (req, res) => {
// //     var custom_idli = {
// //         name: 'rava idli',
// //         size: '10 cm daimeter',
// //         is_sambhar: true,
// //         is_chutney: false
// //     }
// //     res.send(custom_idli);
// // })

// // app.post('/items', (req, res) => {
// //     res.send("Data is saved");
// // })

// // app.post('/person', async (req, res) => {
// //     try{
// //         const data = req.body;
// //         const newPerson = new Person(data);

// //         const response = await newPerson.save();
// //         console.log('data saved');
// //         res.status(200).json(response);
// //     }catch(err){
// //         console.log(err);
// //         res.status(500).json({err: "Internal error"});
// //     }
// // })

// // // GET method to get the person
// // app.get('/person', async (req, res) => {
// //     try{
// //         const data = await Person.find();
// //         console.log('data fetched');
// //         res.status(200).json(data);
// //     }catch(err){
// //         console.log(err);
// //         res.status(500).json({err: "Internal Error"});
// //     }
// // })


//         // this is for menu items.
// app.get('/rajma', (req, res) => {
//     res.send('Sure, let me bring the rajma chawal');
// })

// app.post('/menuItem', async (req, res) => {
//     try{
//         const data = req.body;

//         // create a new entry of an item sent by the user (here through Postman).
//         const newItem = new menuItem(data);

//         // save the new item into the DB.
//         const response = await newItem.save();
//         console.log('Item saved to th DB');
//         res.status(200).json(response);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({err: "Internal Server Error"});
//     }
// });

// app.get('/menuItem', async (req, res) => {
//     try{
//         const data = await menuItem.find();
//         console.log("items fetched");
//         res.status(200).json(data);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({err: "Internal Server Error"});
//     }
// })


// This is to find the endpoints directly insted of typing individually for 'person/chef' / 'person/manager'.
// BUT this is a very bad practice to write the endpoints.

// app.get('/person/:workType', async (req, res) => {
//     try{
//         const workType = req.params.workType;
//         if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
//             const resp = await Person.find({work: workType});
//             console.log('response fetched');
//             res.status(200).json(resp);
//         }
//         else{
//             res.status(404).json({error : "Invalid workTYpe"});
//         }
//     }catch(err){
//         console.log(err);
//         res.status(500).json({err: "Internal Server Error"});
//     }
// })




            // NOW here we have to import the routes for using them.


const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menu', localAuthMiddleware, menuItemRoutes);

app.listen(PORT, '0.0.0.0' ,() => {
    console.log(`server is running, litsening on port ${PORT}`)
});