const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuItem');

router.get('/', async (req, res) => {
    try{
        const resp = await MenuItem.find();
        console.log('items fetched');
        res.status(200).json(resp);
    }catch(err) {
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
});

router.post('/', async (req, res) => {
    try{
        const data = req.body;

        // create a new Item;
        const newItem = new MenuItem(data);

        // save to the DB.
        const resp = await newItem.save();
        console.log('Item saved to DB');
        res.status(200).json(resp);
    }catch(err){
        console.log(err);
        res.status(500).json({err: "Internal Server Error"});
    }
});

router.get('/:taste', async (req, res) => {
    try{
        const taste = req.params.taste;
        if(taste == 'sweet' || taste == 'sour' || taste == 'spicy'){
            const resp = await MenuItem.find({taste: taste});
            console.log('response fetched');
            res.status(200).json(resp);
        }else{
            res.status(404).json({error: "invalid taste"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({err: "Internal Server Error"});
    }
})

router.put('/:id', async (req, res) =>{
    try{
        const menuId = req.params.id;
        const updateItemData = req.body;

        const resp = await MenuItem.findByIdAndUpdate(menuId, updateItemData, {
            new: true,      // return the updated doucment.
            runValidators: true,        // run all the schema things.
        });

        if(!resp){
            return res.status(404).json({error: "Item not found"});
        }

        console.log('item updated');
        res.status(200).json(resp);
    }catch(err){

    }
});

router.delete('/:id', async (req, res) => {
    try{
        const menuId = req.params.id;
        const resp = await MenuItem.findByIdAndDelete(menuId);

        if(!resp){
            return res.status(404).json({message: "Menu not found"});
        }

        console.log('Item deleted');
        res.status(200).json(resp);
    }catch(err){
        console.log(err);
        res.status(500).json({err: "Intermal server error"});
    }
});

module.exports = router;