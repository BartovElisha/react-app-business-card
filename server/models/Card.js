const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256,
    },
    subTitle: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256,
    },
    description: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 1024,
    },
    address: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256,
    },
    phone: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 14,
    },
    image: {
        url: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 1024,
        },
        alt: { type: String, required: true, minlength: 2, maxlength: 256 },
    },
    bizNumber: {
        type: String,
        minlength: 7,
        maxlength: 7,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const Card = mongoose.model("card", cardSchema);

exports.Card = Card;