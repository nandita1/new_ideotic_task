const mongoose = require("mongoose");
const crypto = require("crypto");
const uniqid = require("uniqid");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            match: [/\S+@\S+\.\S+/, 'Email is invalid']
        },
        hashed_password: {
            type: String,
            required: true,
        },
        about: {
            type: String,
            trim: true,
        },
        likedPosts : {
            type: Array,
            default: []
        },
        salt: String,
    }
);

//virtual field
userSchema
    .virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uniqid();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function (password) {
        if (!password) return "";
        try {
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        } catch (err) {
            return "";
        }
    },
};

module.exports = mongoose.model("User", userSchema);
