const Product = require("../models/product.model")
const cloudinary = require("cloudinary").v2;

// cloud config init
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// upload buffer cloud
const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
            }
        );
        stream.end(fileBuffer);
    });
};

// create new prod
async function createProduct(req, res) {
    try {
        const productData = { ...req.body, emailOrPhone: req.user.emailOrPhone };

        if (Number(req.body.sellingPrice) > Number(req.body.mrp)) {
            return res.status(400).json({ message: "Selling price can't be greater than MRP" });
        }

        if (req.body.exchangeReturn) {
            productData.exchangeEligible = req.body.exchangeReturn;
        }

        // uplod files cloud
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
            imageUrls = await Promise.all(uploadPromises);
        }
        productData.productImages = imageUrls;

        const newProduct = new Product(productData);
        const savedProduct = await newProduct.save();

        res.status(201).json({
            message: "Product Created successfully",
            savedProduct,
        })
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


// edit prod info
async function updateProduct(req, res) {
    try {
        const id = req.params.id;
        const updateData = { ...req.body };

        if (Number(updateData.sellingPrice) > Number(updateData.mrp)) {
            return res.status(400).json({ message: "Selling price can't be greater than MRP" });
        }

        if (req.body.exchangeReturn) {
            updateData.exchangeEligible = req.body.exchangeReturn;
        }

        // upload new img
        let newImageUrls = [];
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
            newImageUrls = await Promise.all(uploadPromises);
        }

        // get old urls
        let existingImages = [];
        if (req.body.images) {
            existingImages = Array.isArray(req.body.images)
                ? req.body.images
                : [req.body.images];
        }

        // merge img arrays
        updateData.productImages = [...existingImages, ...newImageUrls];

        const updatedProduct = await Product.findOneAndUpdate(
            {  _id: id, emailOrPhone: req.user.emailOrPhone },
            updateData,
            { returnDocument: 'after' }
        );

        if (!updatedProduct) {
            return res.status(404).json( {message: "Product not found or unauthorized" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}


// remove prod item

async function deleteProduct(req, res){
    try{
        const deletedProduct = await Product.findOneAndDelete({ _id: req.params.id, emailOrPhone: req.user.emailOrPhone });
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found " });
        }
        res.status(200).json({ message: "Product deleted successfully" });

    } catch(err){
        res.status(500).json({ message: err.message });
    }
}

// fetch products filter

async function getProducts(req, res) {
    try {
        const filter = { emailOrPhone: req.user.emailOrPhone };

        if (req.query.status === "published") {
            filter.status = "published";
        }

        if (req.query.status === "unpublished") {
            filter.status = "unpublished";
        }

        const products = await Product.find(filter);

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}

module.exports = { createProduct, updateProduct, deleteProduct, getProducts};