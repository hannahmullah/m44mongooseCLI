const mongoose = require('mongoose');

const movieModel = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    actor: {
        type: String,
        default: "actor not specified"
    },
    director: {
        type: String,
        default: "director not specified"
    },
})

const MovieCollection = mongoose.model("Mongoose Movie", movieModel);

module.exports = MovieCollection;