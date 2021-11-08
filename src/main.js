let todoList = []
let categories = []


const getAllTodos = () => {
  fetch("http://localhost:3000/todos")
    .then(async (response) => {
      todoList = await response.json()

      displayTodos(todoList);
      getAllCategories();
    })
}

const getAllCategories = () => {
  fetch("http://localhost:3000/categories")
    .then(async (response) => {
      categories = await response.json()
      displayCategories(categories);
    })
}


const displayTodos = (list) => {
  let taskList = document.querySelector('#taskList')
  taskList.innerHTML = `<ul>`

  list.map((list) => {
    taskList.innerHTML +=
      `<li class="card">
                <div class="card-body">
                    <div>
                    <button type="button" id="task${list.id}Close" class="btn-close float-end ms-2 mt-1" aria-label="Close" todoID="${list.id}" buttonFunc="close"></button>
                        <button type="button" id="task${list.id}Edit" class="btn btn-success btn-sm float-end" todoID="${list.id}" buttonFunc="edit" taskName="${list.taskName}" categoryName="${list.category}">Edit</button>
                    </div>
                    <input type="checkbox" id="task${list.id}Completed" name="task${list.id}" ${list.completed == true ? 'checked' : ''} todoId="${list.id}" buttonFunc="complete">
                    <label for="task${list.id}"> ${list.taskName}</label><br>
                    <label for="task${list.id}"> ${list.category}</label><br>
                </div>
            </li>`;
  })
  taskList.innerHTML += `</ul>`;

  taskList.addEventListener('click', eventClickHandler)
}

function eventClickHandler(event) {
  if (event.target.attributes.buttonFunc.value == "complete") {
    completeTodo(event.target.attributes.todoId.value)
  } else if (event.target.attributes.buttonFunc.value == "close") {
    deleteTodo(event.target.attributes.todoId.value)
  } else if (event.target.attributes.buttonFunc.value == "edit") {
    editTodo(event.target.attributes)
  }
}

// event listener for add task btn
document.querySelector("#addTaskButton").addEventListener('click', async () => {

  let inputBox = document.querySelector('#newTaskName');
  let newTaskName = inputBox.value
  if (newTaskName !== '') {
    let newId = Math.floor(Math.random() * 1000000);
    let newCategory = document.querySelector('#addSelectCategory').value // new todo select will always be first
    if (newCategory === 'Select Category') {
      newCategory = 'Uncategorized'
    }

    inputBox.value = "";

    await fetch("http://localhost:3000/todos",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: newId,
          taskName: newTaskName,
          completed: false,
          category: newCategory
        })
      }
    ).then(async (response) => {
    })

    getAllTodos();
    displayTodos(todoList);
  }
})

// event listener for add category btn
document.querySelector("#addCategoryButton").addEventListener('click', () => {
  let createCategoryButton = document.querySelector("#addCategoryButton")
  let inputBox = document.querySelector('#newCategoryName')
  let selectedCategory = document.querySelector('#filterCategory')

  let newCategory = inputBox.value

  if (createCategoryButton.innerText === "Save") {

    let dropdownOptions = document.querySelectorAll('.filterOption')

    todoList.forEach((todo) => {
      if (todo.category === selectedCategory.value) {
        todo.category = newCategory;
      }
    })

    for (dropdown of dropdownOptions) {
      if (dropdown.value === selectedCategory.value) {
        dropdown.value = newCategory
        dropdown.innerText = newCategory
      }
    }


    document.querySelector('#addCategoryButton').innerText = 'Create Category';

  } else if (!categories.includes(newCategory) && newCategory != "") {

    categories.push(newCategory)

    let dropdowns = document.querySelectorAll('.categoryPicker')
    dropdowns.forEach((dropdown) => {
      const newElement = document.createElement('option');
      newElement.className = "filterOption"
      newElement.value = newCategory
      newElement.innerHTML = newCategory
      dropdown.appendChild(newElement)
    })
  }

  selectedCategory.selectedIndex = 0;
  inputBox.value = "";

  displayTodos(todoList);
})

document.querySelector("#editCategoryButton").addEventListener('click', (event) => {
  let selectedItem = document.querySelector("#filterCategory").value;

  if (selectedItem !== "Filter By Category" && selectedItem !== "Uncategorized") {
    editCategory(selectedItem)
  }
})

async function deleteTodo(id) {
  await fetch(`http://localhost:3000/todos/${id}`,
    {
      method: 'DELETE',
    }
  ).then(async (response) => {
    // todos = await response.json()
    getAllTodos();
    displayTodos(todoList)
  })
}

function editCategory(categoryName) {
  document.querySelector('#newCategoryName').value = categoryName;
  document.querySelector('#addCategoryButton').innerText = 'Save';
}

function completeTodo(id) {
  todoList = todoList.filter(element => {
    if (element.id == id) {
      element.completed = !element.completed;
    }
    return element;
  })
}

function deleteCompleted() {
  todoList.forEach(async (element) => {
    if (element.completed) {
      await fetch(`http://localhost:3000/todos/${element.id}`,
        {
          method: 'DELETE',
        }
      ).then((response) => {
        getAllTodos()
        displayTodos(todoList)
      })
    }
  })
}


let todoIdToBeEdited = -1;
//edit 
function editTodo(task) {
  todoIdToBeEdited = parseInt(task.todoId.value);
  document.querySelector('#newTaskName').value = task.taskName.value;
  document.querySelector('#addSelectCategory').value = task.categoryName.value;
  document.querySelector('#saveTaskButton').style.display = 'block';
  document.querySelector('#addTaskButton').style.display = 'none';
}

//save 
const saveTodo = async () => {
  let newTaskName = document.querySelector('#newTaskName').value;
  let selectedCategory = document.querySelector('#addSelectCategory');

  if (selectedCategory.selectedIndex == 0) {
    selectedCategory.value = "Uncategorized";
  }


  await fetch(`http://localhost:3000/todos/${todoIdToBeEdited}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        taskName: newTaskName,
        category: selectedCategory.value
      })
    }
  ).then(async (response) => {
  })


  document.querySelector('#newTaskName').value = '';
  document.querySelector('#saveTaskButton').style.display = 'none';
  document.querySelector('#addTaskButton').style.display = 'block';
  selectedCategory.selectedIndex = 0;
  todoIdToBeEdited = -1;
  getAllTodos();
  displayTodos(todoList);
}

document.querySelector('#saveTaskButton').addEventListener('click', () => {
  saveTodo();
})
document.querySelector('#deleteCompleteButton').addEventListener('click', () => {
  deleteCompleted();
})


// grab unique categories and display them in drop down
async function displayCategories(categoryList) {
  let dropdowns = document.querySelectorAll(".categoryPicker");

  let dropdownOptions = document.querySelectorAll('.filterOption')
  dropdownOptions.forEach(option => {
    option.remove()
  })

  categoryList.map((category) => {
    dropdowns.forEach((dropdown) => {
      const newElement = document.createElement('option');
      newElement.className = "filterOption"
      newElement.value = `${category}`
      newElement.innerHTML = `${category}`
      dropdown.appendChild(newElement)
    })
  })
}

//view by Categories
const filterList = (event) => {
  let selectElement = event.target;
  let value = selectElement.value;
  let filteredList = todoList.filter(e => e.category == value);
  filteredList.length > 0 ? displayTodos(filteredList) : displayTodos([]);

}
const categoryDropDown = document.querySelector('#filterCategory');
categoryDropDown.addEventListener('change', filterList);


getAllTodos();