const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const todosController = require('./todosController')
const categoriesController = require('./categoriesController')

mongoose
    .connect(process.env.MONGO_URI)
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