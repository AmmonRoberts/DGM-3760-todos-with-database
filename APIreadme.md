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