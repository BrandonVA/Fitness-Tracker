const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    type: {
        type: String,
        trim: true,
        required: 'enter a type of exercise',
    },
    name: {
        type: String,
        trim: true,
        required: 'enter the name of exercise',
    },
    duration: {
        type: Number,
        required: "Enter an amount"
    },
    distance: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    reps: {
        type: Number,
    },
    sets: {
        type: Number,
    },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;