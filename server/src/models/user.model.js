const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        emailOrPhone: {
            type: String,
            trim: true
        }

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);