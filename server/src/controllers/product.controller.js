const Product = require("../models/product.model")

// create new product
async function createProduct(req, res) {
    try {
        const productData = { ...req.body, userId: req.user.id }

        if (Number(req.body.sellingPrice) > Number(req.body.mrp)) {
            return res.status(400).json({ message: "Selling price can't be greater than MRP" });
        }

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


// edit product
async function updateProduct(req, res) {
    try {
        const id = req.params.id;
        const updateData = req.body;

        if (Number(updateData.sellingPrice) > Number(updateData.mrp)) {
            return res.status(400).json({ message: "Selling price can't be greater than MRP" });
        }

        const updatedProduct = await Product.findOneAndUpdate(
            {  _id: id, userId: req.user.id },
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


//delete product

async function deleteProduct(req, res){
    try{
        const deletedProduct = await Product.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found " });
        }
        res.status(200).json({ message: "Product deleted successfully" });

    } catch(err){
        res.status(500).json({ message: err.message });
    }
}

//get products on base of params and query pass

async function getProducts(req, res) {
    try {
        const filter = { userId: req.user.id };

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