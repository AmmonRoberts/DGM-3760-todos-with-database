const router = require("express").Router();
const Todo = require("./models/todo")

router.get('/', async (req, res) => {
    const todos = await Todo.find()
    res.send(todos)
});
router.get('/:category', async (req, res) => {
    const todos = await Todo.find()

    let results = todos.filter((todo, index) => {
        if (todo.category.toLowerCase() == req.params.category.toLowerCase()) {
            return todo;
        }
    });

    if (results) {
        res.send(results);
    }
    else {
        res.status(404).send("Todo not found!")
    }
});

router.post('/', async (req, res) => {
    let newId = Math.floor(Math.random() * 1000000);
    let newCategory = req.body.category
    let newTaskName = req.body.taskName
    const newTodo = new Todo({
        id: newId,
        taskName: newTaskName,
        completed: false,
        category: newCategory
    })

    await newTodo.save()
    res.send(newTodo);
});

router.put('/:id', async (req, res) => {
    try {
        let todo = await Todo.findOne({ id: req.params.id })

        todo.taskName = req.body.taskName
        todo.category = req.body.category

        await todo.save()
        res.send(todo);
    }
    catch {
        res.status(404).send("Todo not found!")
    }
});

router.delete('/:id', async (req, res) => {

    try {
        await Todo.deleteOne({ id: req.params.id })
        res.status(204).send()
    }
    catch {
        res.status(404).send("Todo not found!")

    }
});

module.exports = router;