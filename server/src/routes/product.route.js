const express = require("express")
const { createProduct, updateProduct, deleteProduct, getProducts} = require("../controllers/product.controller")
const auth = require("../middleware/auth")

const router = express.Router()

router.post("/create-product", auth, createProduct)
router.put("/update-product/:id", auth, updateProduct)
router.delete("/delete-product/:id", auth, deleteProduct)
router.get("/get-products", auth, getProducts)

module.exports = router