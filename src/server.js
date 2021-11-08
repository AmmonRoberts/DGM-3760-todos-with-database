const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require("mongoose")

const todosController = require('./todosController')
const categoriesController = require('./categoriesController')


mongoose
    .connect("mongodb+srv://ammon:i^o$*hMLM8O9mO^m@cluster0.tbmo2.mongodb.net/todos?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => {
        app.use(bodyParser.json());
        app.use(cors());
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use("/todos", todosController)
        app.use("/categories", categoriesController)

        app.listen(3000, () => {
            console.log("Server running on port 3000");
        });
    })