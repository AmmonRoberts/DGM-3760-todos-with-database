const router = require("express").Router();
const todos = require('./todos')

router.get('/', (req, res) => {
    let categories = [... new Set(todos.map((element) =>
        element.category
    ))]

    res.send(categories);
});

router.post('/', (req, res) => {
    // Wasn't really sure what this one would do because of the way we started doing categories
    // If we couple things more loosely for this, it would end up being a pretty sizable overhaul of the way we've been handling categories
    res.sendStatus(200);
});

router.put('/:oldCategory', (req, res) => {
    let result = todos.filter((todo, index) => {
        if (todo.category.toLowerCase() == req.params.oldCategory.toLowerCase()) {
            todo.category = req.body.category
            return todo
        }
    });

    if (result.length) {
        res.send(result);
    }
    else {
        res.status(404).send("Category not found!")
    }
});

router.delete('/:category', (req, res) => {
    let result = todos.filter((todo, index) => {
        if (todo.category.toLowerCase() == req.params.category.toLowerCase()) {
            todo.category = "Uncategorized"
            return todo
        }
    });

    if (result.length) {
        res.send(result);
    }
    else {
        res.status(404).send("Category not found!")
    }
});

module.exports = router;