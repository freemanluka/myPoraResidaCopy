const mongoose = require("mongoose");



const userSchema = mongoose.Schema(
    {
        first_name: {type: String},
        last_name: {type: String},
        email: {type: String},
        phone_number: {type: String},
        subject: {type: String},

        isDeleted: {type: Boolean, default: false},
        DeletedAt: {type: Date, default: null},
    },
    {timestamps: true}
);

module.exports = mongoose.model("user", userSchema);
