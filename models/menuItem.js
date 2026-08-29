const mongoose = require('mongoose');
const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        required: true
    },
    is_drink: {
        type: Boolean,
        default: false
    },
    ingrediants: {
        type: [String],
        default: []
    },
    num_sales: {
        type: Number,
        default: 0
    }
});

// This is JS varibale containing Mongoose model.
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

// This means that whatever another file gets when it requires this file will be this MenuItem model
module.exports = MenuItem;