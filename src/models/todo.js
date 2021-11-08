const mongoose = require("mongoose")

const schema = mongoose.Schema({
    id: Number,
    taskName: String,
    completed: Boolean,
    category: String
})

module.exports = mongoose.model("Todo", schema)