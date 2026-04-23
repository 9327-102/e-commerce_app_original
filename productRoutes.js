const router = require('express').Router();
const Product = require('../models/Product');
const multer = require('multer');

// Storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'backend/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// 👉 ADD PRODUCT WITH IMAGE
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            image: req.file ? req.file.filename : null
        });

        await product.save();
        res.json(product);

    } catch (err) {
        res.status(500).json(err);
    }
});

// 👉 GET PRODUCTS
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

module.exports = router;