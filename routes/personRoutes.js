const express = require('express');
const Person = require('../models/person');
const router = express.Router();

router.post('/', async (req, res) => {
    try{
        const data = req.body;

        // create a new entry for DB.
        const newPerson = new Person(data);

        // save into the DB.
        const resp = await newPerson.save();
        console.log('Person saved');
        res.status(200).json(resp);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "internal error occured"});
    }
});

router.get('/', async (req, res) => {
    try{
        const data = await Person.find();
        console.log('Items found');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "internal error occured"});
    }
})

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const resp = await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(resp);
        }else{
            res.status(404).json({error : "Invalid workTYpe"});
        }
    } catch (error) {
        console.log(err);
        res.status(500).json({err: "Internal Server Error"});
    }
});

router.put('/:id', async (req, res) => {
    try{
        const personId = req.params.id;         // extract the id from the URL paramater.
        const updatedPersonData = req.body;

        const updatedPerson = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,      // return the updated document.
            runValidators: true,    // run the mongoose validation.
        })

        if(!updatedPerson){
            return res.status(404).json({error: "Person not found"});
        }

        console.log('data updated');
        res.status(200).json(updatedPerson);
    }catch(err){
        console.log(err);
        res.status(500).json({err: "Internal Server Error"});
    }
});


router.delete('/:id', async (req, res) => {
    try{
        const personId = req.params.id;
        
        // Asume you have a Person Model.
        const resp = await Person.findByIdAndDelete(personId);
        if(!resp){
            return res.status(404).json({error: "Person not found"});
        }

        console.log('data deleted');
        res.status(200).json({message: "Person deleted Success"});
    }catch(err){
        console.log(err);
        res.status(500).json({err: "Internal Server Error"});
    }
});

module.exports = router