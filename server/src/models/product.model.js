const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        emailOrPhone: {
            type: String,
            required: true,
            trim: true,
        },
        
        productName: {
            type: String,
            required: true,
            trim: true,
        },

        productType: {
            type: String,
            required: true,
            enum: [
                "Foods",
                "Electronics",
                "Clothes",
                "Beauty Products",
                "Others",
            ],
        },

        quantityStock: {
            type: Number,
            required: true,
            min: 0,
        },

        mrp: {
            type: Number,
            required: true,
            min: 0,
        },

        sellingPrice: {
            type: Number,
            required: true,
            min: 0,
        },

        brandName: {
            type: String,
            required: true,
            trim: true,
        },

        productImages: [{
            type: String,
            required: true
        }],

        exchangeEligible: {
            type: String,
            required: true,
            enum: [
                "Yes",
                "No"
            ],
        },

        status: {
            type: String,
            enum: ["published", "unpublished"],
            default: "published",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema);