const express = require("express")
const multer = require("multer")
const { createProduct, updateProduct, deleteProduct, getProducts} = require("../controllers/product.controller")
const auth = require("../middleware/auth")

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.post("/create-product", auth, upload.array("images"), createProduct)
router.put("/update-product/:id", auth, upload.array("images"), updateProduct)
router.delete("/delete-product/:id", auth, deleteProduct)
router.get("/get-products", auth, getProducts)

module.exports = router