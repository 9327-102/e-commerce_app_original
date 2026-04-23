const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String,   // image path
    category: String // new category field
});

module.exports = mongoose.model('Product', ProductSchema);