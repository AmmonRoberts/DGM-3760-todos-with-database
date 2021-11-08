# NodeJS API

## Controllers

### todosController
- **GET**: Gets all todos
  - localhost:3000/todos
- **GET**: Get all tasks from category
  - localhost:3000/todos/{categoryName}
- **POST**: Create new todo
  - localhost:3000/todos
    - {taskName, category}
- **PUT**: Update existing todo
  - localhost:3000/todos/{id}
    - {name, category}
- **DELETE**: Delete todo
  - localhost:3000/todos/{id}


### categoriesController
- **GET**: Gets all categories
  - localhost:3000/categories
- **POST**: Create new category
  - localhost:3000/categories
    - {taskName}
- **PUT**: Update existing category
  - localhost:3000/categories/{categoryName}
    - {taskName}
- **DELETE**: Delete category (sets category for each to "Undefined")
  - localhost:3000/categories/{categoryName}
